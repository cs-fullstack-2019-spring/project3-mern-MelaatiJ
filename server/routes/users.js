var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var ExpressCollection = require("../models/ExpressSchema");

// Initialize passport and restore cookie data //
router.use(passport.initialize());
router.use(passport.session());


// serialization and deserialization
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  ExpressCollection.findById(id, function(err, user) {
    done(err, user);
  });
});

// Validation for password
var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};

// password scrambler ( randomizes it )
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

//logout route
router.get('/logout', (req, res) => {
    req.session = null
});

// create a new user
passport.use('register', new LocalStrategy(
    {passReqToCallback : true},
    function(request, username, password, done) {
      findOrCreateUser = function(){
        ExpressCollection.findOne({'username':username},function(error, user) {
          // In case of any error in Mongoose/Mongo when finding the user
          if (user){
            return done(null, false, {message:'User Exists'});
          } else {
            var newUser = new ExpressCollection();
            // set the user's local credentials
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.profilePic=request.body.profilePic;
            newUser.backgroundPic = request.body.backgroundPic;

            // save the user. Works like .create, but for an object of a schema
            newUser.save((errors) => {
              if (errors){
                console.log('Error in Saving user: '+ errors);
                throw errors;
              }
              console.log('User Registration succesful');
              return done(null, newUser);
            });
          }
        });
      };
      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    })
);

router.post('/register',
    passport.authenticate('register',
        {failureRedirect: '/users/userRegisterFail', successRedirect: '/users/userRegisterSuccess'}
    ),
    function(request, response) {
      // Send the message in the .send function
      response.send(request.body.username);
    });

router.get('/userRegisterSuccess', function(request, response){
    response.send("Registration success, Express Yourself")
});

router.get('/userRegisterFail', function(request, response){
  response.send("Registration Failed. Please retry")
});

// check existing user
passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log("Local Strat");
      ExpressCollection.findOne({ username: username }, function (err, user) {
        if (err){
          return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        // Check to see if the password typed into the form and the user's saved password is the same.
        if (!isValidPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        // null is here because there is not an error
        // user is the results of the findOne function
        return done(null, user, { user: user.username });
      });
    }
));

// login
router.post('/login',
    // Passport's authenticate function called the local strategy. Once it's complete it's either successful or failed
    passport.authenticate('local',
        // If the signup strategy fails, redirect to the /users/failNewUser route
        {failureRedirect: '/users/loginFail' }),

    // If this function gets called, authentication was successful.
    function(request, response) {
      request.session.username=request.body.username;
      // Send the username and email back to the client to save to the client's state
      response.send(request.session.username);
    });

router.get('/loginFail', function(request, response){
  response.send(undefined)
});


// logout route
router.get("/logout", function(request, response, next){
  request.session = null;
});




router.post('/addTweet', (req, res) => {
    ExpressCollection.findOneAndUpdate({username: req.body.username},
        // adding it to the data base
        {$push: {tweets: req.body}}, (errors, results) => {
            if (errors) res.send(errors);
            else res.send("Tweet Added");
        });
});


router.put("/editTweet", (request, response) =>{
    ExpressCollection.fineOneAndUpdate(
        {_id:request.body.tweets},
        {
            $set:{
                "tweets.$.tweetMessage":request.body.tweetMessage,
                "tweets.$.tweetPic":request.body.tweetPic,
                "tweets.$.tweetVisible":request.body.tweetVisible,


            }

    }, (errors) => {
        if(errors)
        {
            response.send(errors)
        }
        else
        {
            response.send("Updated")
        }
    });
});

router.get("/tweets", (request, response) => {
    ExpressCollection.find({}, (errors, results) => {
        if(errors)
        {
            response.send(errors)
        }
        else
        {
            response.send(results)
        }
    })
});

router.post("/searchUsers", (request, response) => {
    ExpressCollection.findOne({username:request.body.username}, (errors, results) =>{
        if(errors){
            response.send(errors)
        }
        else{
            response.send(results);

        }
    })
});

router.post('/search', (req, res) => {
    ExpressCollection.find(
        {"tweets.tweetMessage": {"$regex": req.body.searchBar, "$options": "i"}}, (errors, results) => {
            if (errors) res.send(errors);
            else {
                let allresults = [];
                let searchResults = [];
                for (let i = 0; i < results.length; i++) {
                    for (let j = 0; j < results[i].tweets.length; j++) {
                        allresults.push(
                            {
                                tweetMessage:results[i].tweets[j].tweetMessage,
                                tweetPic:results[i].tweets[j].tweetPic,
                            }
                        )
                    }
                }
                for(let i=0; i<allresults.length; i++){
                    if(allresults[i].tweetMessage.includes(req.body.searchBar)){
                        searchResults.push(allresults[i])
                    }
                }
                res.send(searchResults);
            }
        })
});






module.exports = router;

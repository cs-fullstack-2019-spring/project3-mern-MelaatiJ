var express = require('express');
var router = express.Router();

//  ********* used to hash passwords ****** //
var bCrypt = require('bcrypt-nodejs');

// middleware for authentication . Run at the start of a route that uses a strategy //
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// model
var TwitterCollection = require("../models/TwitterSchema");

// Initialize passport and restore cookie data //
router.use(passport.initialize());
router.use(passport.session());


// serialization and deserialization
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  userCollection.findById(id, function(err, user) {
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

// create a new user
passport.use('register', new LocalStrategy(
    // Allows you to use the req.body of the route that called the strategy
    {passReqToCallback : true},
    function(request, username, password, done) {
      // Created like this so it can be delayed to be run in the next "tick" loop. See function call below.
      findOrCreateUser = function(){
        // find a user in Mongo with provided username. It returns an error if there is an error or the full entry for that user
        TwitterCollection.findOne({'username':username},function(error, user) {
          // In case of any error in Mongoose/Mongo when finding the user
          if (error){
            console.log('Error in SignUp: '+error);
            // Return the error in the callback function done
            return done(error);
          }
          // if the user already exists
          if (user) {
            return done(null, false,
                { message: 'User already exists.' }
            );
          } else {
            console.log(request.body);
            // if there is no user with that email
            // create the user
            var newUser = new TwitterCollection();
            // set the user's local credentials
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.profilePic=request.body.profilePic;
            newUser.backgroudPic = request.body.backgroundPic;

            // save the user. Works like .create, but for an object of a schema
            newUser.save(function(error) {
              // If there is an error
              if (error){
                console.log('Error in Saving user: '+error);
                // Throw error to catch in the client
                throw error;
              }
              console.log('User Registration succesful');
              // Null is returned because there was no error
              // newUser is returned in case the route that called this strategy (callback route) needs any of it's info.
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
    // Passport's authenticate function is called the register strategy. Once it's complete it's either successful or failed
    passport.authenticate('register',
        // If the register strategy fails, redirect to the /users/failNewUser route
        {failureRedirect: '/users/userRegisterFail'}
    ),
    // If the signup strategy is successful, send "User Created!!!"
    function(request, response) {
      // Send the message in the .send function
      response.send('User Created!!!');
    });


router.get('/userRegisterFail', function(request, response){
  response.send("Registration Failed")
});


// check existing user
passport.use(new LocalStrategy(
    // req is the request of the route that called the strategy
    // username and password are passed by passport by default
    // done is the function to end the strategy (callback function).
    function(username, password, done) {
      console.log("Local Strat");
      // find a user in Mongo with provided username. It returns an error if there is an error or the full entry for that user
      TwitterCollection.findOne({ username: username }, function (err, user) {
        // If there is a MongoDB/Mongoose error, send the error
        if (err){
          return done(err); }
        // If there is not a user in the database, it's a failure and send the message below
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
        {failureRedirect: '/users/loginfail' }),

    // If this function gets called, authentication was successful.
    function(request, response) {
      request.session.username=request.user.username;
      // Send the username and email back to the client to save to the client's state
      response.send("u");
    });

router.get('/loginFail', function(request, response){
  response.send(undefined)
});


// logout route
router.get("/logout", function(request, response, next){
  request.session = null;
});




router.post("/addTweet", function(request, response) {
  TwitterCollection.create( request.body.tweetPic, request.body.tweetMessage, request.body.tweetVisible, (errors, results) => {
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

router.put("/editTweet", (request, response) =>{
    TwitterCollection.findOneAndUpdate({id:request.body.id},request.body, (errors, results) => {
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

router.get("/tweets", (request, response) => {
    TwitterCollection.find({}, (errors, results) => {
        if(errors)
        {
            response.send(errors)
        }
        else
        {
            response.send(results)
        }
    })
})








module.exports = router;

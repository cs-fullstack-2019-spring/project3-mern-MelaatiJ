var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TwiiterSchema = new Schema(
    {
        username: {type:String, required:true, max:100},
        password: {type:String, required:true, max:100},
        profilePic: {type:String, max:400},
        backgroundPic: {type:String, max:400},
        tweets:[{tweetPic:String, tweetMessage:String, tweetVisible:Boolean }]


    }
);


// Export Model
module.exports = mongoose.model("Twitter", TwiiterSchema);
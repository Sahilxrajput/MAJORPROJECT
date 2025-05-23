const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');



const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
    }
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


module.exports = mongoose.model("User", userSchema);

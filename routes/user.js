if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user"); 
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");
const userController = require("../controllers/user")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback   : true
  },
  
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);

    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));


router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/listings',
        failureRedirect: '/login',
}));


router.route("/signup")
    .get( userController.renderSignupForm)
    .post( wrapAsync(userController.signup));


router.route("/login") 
  .get(userController.renderLoginForm)
  .post( 
    saveRedirectUrl,
     passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash: true,
}),
    userController.login
);

router.get("/logout",userController.logout)


module.exports = router;
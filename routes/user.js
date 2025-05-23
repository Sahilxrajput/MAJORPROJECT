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
const User = require("../models/user");
const passport = require('passport')

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup");
};

module.exports.signup = async(req,res, next) => { 
   try {
    let {username, email , password} = req.body;
    
    if( !username || !email || !password ){
        return res.status(400).json({message: "Provide all the cradietails "})
    }

    const newUser = new User({ email, username});
    const registeredUser = await User.register(newUser , password);
    
    req.login(registeredUser, (err) => {
        if(err) {
            return next();
        }
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
    })
   } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
   }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login");
};

module.exports.login = async(req,res,next)=>{
    req.logout((err)=>{
        if (err) {
          return  next(err);
        }
    req.flash("success", "Welcome back to Wondelust");
    let redirectUrl = res.locals.redirectUrl ||"/listings";  
     passport.authenticate("local")(req, res, function(){
            res.redirect("/listings");
          });
})};

module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
        if (err) {
          return  next(err);
        }
        req.flash("success", "You are loged out!");
        res.redirect("/listings");
    })
};
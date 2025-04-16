if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");  
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
//Routes
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");



async function main() {
    await mongoose.connect(process.env.ATLAS_DB_URL);
};

main()
    .then(()=>{
        console.log("Connected to databases");
    })
    .catch((e)=>{
        console.log(e);
    });


app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);


const store = MongoStore.create({
    mongoUrl: process.env.ATLAS_DB_URL,
    crypto: {
        secret: process.env.DB_SECRET,
    },
    touchAfter: 24 * 60 * 60, // 24 hours
});

store.on("error", function(e){
    console.log("Mongo Session store error", e);
});

const sessionOptions = {
    store,
    secret: process.env.DB_SECRET,
    resave: false,
    saveUninitialized: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
     maxAge: 1000 * 60 * 60 * 24 * 7,
     httpOnly: true
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.get("/privacy", (req,res,next)=>{
    res.render("./listings/privacyAndTerms");
})
app.get("/",(req,res,next)=>{
    res.send("I am root!");
})

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

app.listen(8080, ()=>{
    console.log("app is listening");
});

const express = require("express"),
app = express(),
mongoose = require("mongoose"),
bodyParser= require("body-parser"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
passportLocalMognoose = require("passport-local-mongoose"),
port = process.env.port || 3000,
User = require("./models/user");


const blogRoutes = require("./routes/blogs");

//APP CONFIG
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("views"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
  secret:"Samuel vytvara prvu riadnu webstranku",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//MAIN ROUTE
app.get("/", (req,res) => res.render("index"));

//BLOG ROUTES
app.use("/blogs", blogRoutes);

//REGISTER/LOGIN ROUTES


//SERVER
app.listen(port, () => console.log("SERVER UP"));
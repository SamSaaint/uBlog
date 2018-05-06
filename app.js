const express = require("express"),
app = express(),
mongoose = require("mongoose"),
bodyParser= require("body-parser"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
passportLocalMognoose = require("passport-local-mongoose"),
port = process.env.PORT || 3000,
methodOverride = require("method-override"),
User = require("./models/user");


const blogRoutes = require("./routes/blogs");

//APP CONFIG
app.use(methodOverride("_method"));
mongoose.connect(process.env.databaseURL || "mongodb://localhost/blog_app");
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
//to pass current user into every route
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});


//MAIN ROUTE
app.get("/", (req,res) => res.render("index"));

//BLOG ROUTES
app.use("/blogs", blogRoutes);

//REGISTER ROUTE

app.get("/register", (req,res) => res.render("register"));

app.post("/register", function(req,res){
	let username = req.body.username;
	let password = req.body.password;
	User.register(new User({username: username}), password, function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/");
		})
	})
})

//LOGIN ROUTE
app.post("/", passport.authenticate("local", {
	successRedirect: "/blogs",
	failureRedirect: "/"
}), function(req,res){
})

//LOGOUT ROUTE
app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/");	
})

//SERVER
app.listen(port, () => console.log("SERVER UP"));
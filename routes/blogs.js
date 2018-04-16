const express = require("express"),
router = express.Router(),
Blog = require("../models/blog");

//INDEX ROUTE
router.get("/", function(req,res){
	Blog.find({}, function(err,blogs){
		if(err){
			console.log("ERROR");
		} else {
			res.render("main", {blogs:blogs});
		}
	})
})

//NEW BLOG ROUTE
router.get("/new", (req,res) => res.render("new"));

//CREATE ROUTE
router.post("/", function(req,res){
	Blog.create(req.body.blog, function(err,newBlog){
		if(err){
			res.render("new");
		} else {
			res.redirect("/");
		}
	})
})

module.exports = router;

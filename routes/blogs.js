const express = require("express"),
router = express.Router(),
Blog = require("../models/blog");

// MAIN ROUTE - ALL BLOGS
router.get("/",isLoggedIn, function(req,res){
	Blog.find({}, function(err,blogs){
		if(err){
			console.log("ERROR");
		} else {
			res.render("main", {blogs:blogs});
		}
	})
})

// NEW BLOG ROUTE
router.get("/new",isLoggedIn, (req,res) => res.render("new"));

// CREATE BLOG ROUTE
router.post("/",isLoggedIn, function(req,res){
	Blog.create(req.body.blog, function(err,newBlog){
		if(err){
			res.render("new");
		} else {
			console.log(newBlog)
			res.redirect("/blogs");
		}
	})
})

// SHOW BLOG ROUTE
router.get("/:id",isLoggedIn, function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			console.log(err)
		} else {
			res.render("show", {blog:foundBlog})
		}
	})
})

// EDIT BLOG ROUTE
router.get("/:id/edit",isLoggedIn, function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		} else{
			res.render("edit", {blog: foundBlog});
		}
	})
})

// UPDATE BLOG ROUTE
router.put("/:id",isLoggedIn, function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
})

// DELETE BLOG ROUTE
router.delete("/:id",isLoggedIn, function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
})

//middleware 
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}

module.exports = router;

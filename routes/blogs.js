const express = require("express"),
router = express.Router(),
Blog = require("../models/blog");

// MAIN ROUTE - ALL BLOGS
router.get("/", function(req,res){
	Blog.find({}, function(err,blogs){
		if(err){
			console.log("ERROR");
		} else {
			res.render("main", {blogs:blogs});
		}
	})
})

// NEW BLOG ROUTE
router.get("/new", (req,res) => res.render("new"));

// CREATE BLOG ROUTE
router.post("/", function(req,res){
	Blog.create(req.body.blog, function(err,newBlog){
		if(err){
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	})
})

// SHOW BLOG ROUTE
router.get("/:id", function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			console.log(err)
		} else {
			res.render("show", {blog:foundBlog})
		}
	})
})

// EDIT BLOG ROUTE
router.get("/:id/edit", function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		if(err){
			res.redirect("/blogs");
		} else{
			res.render("edit", {blog: foundBlog});
		}
	})
})

// UPDATE BLOG ROUTE
router.put("/:id", function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
})

// DELETE BLOG ROUTE
router.delete("/:id", function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
})

module.exports = router;

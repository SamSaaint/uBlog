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
router.get("/new",isLoggedIn, function(req,res){
	res.render("new");
});

// CREATE BLOG ROUTE
router.post("/",isLoggedIn, function(req,res){
	let title = req.body.blog.title;
	let image = req.body.blog.image;
	let body = req.body.blog.body;  
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	let createdBlog = {title: title, image: image, body: body, author: author}
	Blog.create(createdBlog, function(err,newBlog){
		if(err){
			res.render("new");
		} else {
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
router.get("/:id/edit",checkBlogOwnership, function(req,res){
	Blog.findById(req.params.id, function(err,foundBlog){
		res.render("edit", {blog: foundBlog});
	})
})

// UPDATE BLOG ROUTE
router.put("/:id",checkBlogOwnership, function(req,res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,updatedBlog){
		res.redirect("/blogs/" + req.params.id);
	})
})

// DELETE BLOG ROUTE
router.delete("/:id",checkBlogOwnership, function(req,res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		res.redirect("/blogs");
	})
})

//middleware 
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}

function checkBlogOwnership(req,res,next){
	if(req.isAuthenticated()){
		Blog.findById(req.params.id, function(err,foundBlog){
			if(err){
				res.redirect("back");
			} else {
				if(foundBlog.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		})
	} else {
		res.redirect("back")
	}
}

module.exports = router;

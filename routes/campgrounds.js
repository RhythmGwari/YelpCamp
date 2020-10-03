
// ========================================CAMPGROUNDS====================================================
var express = require("express");
var router = express.Router();
var campground = require("../models/campgrounds");
var middleware = require("../middleware");

router.get("/", function(req, res){
	campground.find({}, function(err , allcampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds});
		}
	});	
});
// CREATE - add a new campground
router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.namecamp;
	var price = req.body.price;
	var ratings = req.body.ratings;
	var desc = req.body.description;
	var image = req.body.image;
	var author = {
		id : req.user._id,
		username : req.user.username
	};
	var newCampground = {name:name , image:image, price:price, ratings : ratings, description:desc, author:author};
	campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");	
		}
	});
});
// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn ,function(req, res){
	res.render("campgrounds/new");
});
// SHOW - show details about the campgrounds
router.get("/:id", function(req, res){
	campground.findById(req.params.id).populate("Comment").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);			
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});	
});
// EDIT - show a new form to edit the existing campgrounds
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
	campground.findById(req.params.id, function(err, foundCampground){
		res.render("campgrounds/edit", {campground:foundCampground});
	});	
});
// UPDATE - update the editted campground
router.put("/:id", function(req, res){
	campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{			
			res.redirect("/campgrounds/"+req.params.id);
		}
	});	
});

// DELETE - delete the, router
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
	campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});
module.exports = router;


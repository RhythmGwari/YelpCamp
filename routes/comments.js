var express = require("express");
var router = express.Router({mergeParams:true});
var campground = require("../models/campgrounds");
var Comment = require("../models/Comments");
var middleware = require("../middleware");

// =================================================COMMENTS=====================================================
router.get("/new",middleware.isLoggedIn,function(req, res){
	campground.findById(req.params.id , function(err, campground){
		if(err){console.log(err);}
		else{
			res.render("comments/new" , {campground:campground});
		}
		});		
});
router.post("/", function(req, res){
	console.log(req.params.id);
	campground.findById(req.params.id, function(err, campground){
		if(err){
		console.log(err);
		console.log("/campgrounds");
	}else{
		Comment.create(req.body.comment, function(err, comment){
			if(err){
				console.log(err);
			}else{
				comment.author.id = req.user.id;
				comment.author.username = req.user.username;
				comment.save();
				campground.Comment.push(comment);
				campground.save();
				req.flash("success" , "Comment added successfully");
				res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});	
});

router.get("/:comment_id/edit",middleware.checkOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			req.flash("error", "Comment not found");
			res.redirect("back");
		}else{
			res.render("./comments/edit",{campgroundid : req.params.id, comment:foundComment});
		}
	});
});
router.put("/:comment_id", function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success" , "Comment Updated");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
router.delete("/:comment_id",middleware.checkOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("Oopss!!! Something went wrong...")
			res.redirect("back");
		}else{
			req.flash("success" , "Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});



module.exports = router;

// ========================================MIDDLEWARE============================================
var middlewareObj = {};
var campground = require("../models/campgrounds");
var Comment = require("../models/Comments");
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found");
				res.redirect("back");
			}
				else{
					if(foundCampground.author.id.equals(req.user.id)){
						next();
					}
						else{
							req.flash("error", "You do not have permission to do that");
							res.redirect("back");
						}
				}
		});
	}
		else{
			req.flash("error" , "You need to be logged in to do that");
			res.redirect("back");
		}
}
middlewareObj.checkOwnership = function(req, res, next){
	if(req.isAuthenticated){
		Comment.findById(req.params.comment_id, function(err,foundComment){
			if(err){
				req.flash("error", "Something went wrong");
				res.redirect("/campgrounds");
			}
				else{
						if(foundComment.author.id.equals(req.user.id)){
							next();
						}
							else{
								req.flash("You do not have permission to do that");
								res.redirect("back");
							}
					}
		});
	}else{
		req.flash("error", "You need to be logged in");
		res.redirect("back");
	}
}
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
	   return next();
	   }
		req.flash("error", "to continue the action, you need to be logged in");
		res.redirect("/login");
	
}
middlewareObj.isAdmin = function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash('error', 'This site is now read only thanks to spam and trolls.');
      res.redirect('back');
    }
  }
module.exports = middlewareObj;
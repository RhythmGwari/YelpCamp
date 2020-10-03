var mongoose = require("mongoose");
var campground = require("./models/campgrounds.js");
var Comment = require("./models/Comments.js");
var data = [
	{name: " Wild tent ",
	 image : "https://images.unsplash.com/photo-1583606317098-8926d58c73c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=774&q=80",
	 description : "Located in Madikeri in the Karnataka region, Wild tent provides accommodations with free private parking.There's a seating and/or dining area in some units.Guests at the campground can enjoy a vegetarian breakfast.Guests can also relax in the garden.Madikeri Fort is 2.9 km from Wild tent, while Raja Seat is 3.1 km away. The nearest airport is Kannur International Airport, 93.3 km from the accommodation."
	},
	{name: "Mount Adventure Camp",
	 image : "https://images.unsplash.com/photo-1547461056-8f20f1888e84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
	 description : "Located in Kakkabe in the Karnataka region, Jungle Mount Adventure Camp has	accommodations with free private parking.The campground offers a continental or vegetarian breakfast.Guests can relax in the garden at the property.Madikeri is 30.6 km from Jungle Mount Adventure	Camp. The nearest airport is Kannur International Airport, 83.7 km from the accommodation."
	},
	{name: "Areca campsite ",
	 image : "https://images.unsplash.com/photo-1579511633999-ac43b51aaa06?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" , 
	 description : "Located in Kushālnagar in the Karnataka region, Areca campsite has accommodations with free private parking.Guests can also relax in the garden.Madikeri is 37 km from the campground. The nearest airport is Kannur International Airport, 111 km from Areca campsite."}
]
function seedDB(){
	campground.remove({},function(err){
			if(err){
				console.log(err);
			}
			console.log("Removed all campgrounds");
		//adding campgrounds
		data.forEach(function(seed){
			campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				}else{
					console.log("added a campground");
					//adding comments
					Comment.create({
						text : "This place is beautiful",
						author : "John Doe"
					}, function(err, Comment){
						if(err){
							console.log(err);
						}else{
							campground.Comment.push(Comment);
							campground.save();
							console.log("created a comment");
						}
					});
				}
			});				 
		});
	});
}
module.exports = seedDB;
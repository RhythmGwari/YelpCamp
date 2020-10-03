var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
	name : String ,
	price: String,
	image : String ,
	ratings : Number,
	description : String,
	author : {
		id : {
			type : mongoose.Schema.Types.ObjectId ,
			ref : "User"
		} ,
		username : String
	},
	Comment :[
		{
			type : mongoose.Schema.Types.ObjectId,
			ref :  "Comment"
		}
	]
}); 

module.exports= mongoose.model("campground", campgroundSchema);
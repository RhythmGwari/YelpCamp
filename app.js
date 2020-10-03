var express 			  = require("express"),
	flash				  = require("connect-flash"),
	passport 			  = require("passport"),
	bodyParser			  = require("body-parser"),
	LocalStrategy		  = require("passport-local"),
	methodOverride        = require("method-override"),
	rp					  = require("request-promise"),
	campground			  = require("./models/campgrounds"),
	passportLocalMongoose = require("passport-local-mongoose");

var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes    = require("./routes/comments");
var authRoutes       = require("./routes/auth");

var seedDB 	= require("./seeds.js"),
    User 	= require("./models/user.js"),
    Comment = require("./models/Comments.js");
// seedDB();   // seed the database
//================================================================================================
//                                   APP CONFIGURATION
//================================================================================================
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelpCamp",{
				useNewUrlParser: true,
				useUnifiedTopology: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret 			  : "my name is rhythm",
	resave 			  : false,
	saveUninitialized :false
}));
app.use(flash());

//================================================================================================
//                          	PASSPORT CONFIGURATION
//================================================================================================

passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res, next){
	res.locals.currentUser = req.user;
	res.locals.error     = req.flash("error");
	res.locals.success     = req.flash("success");
	next();
});


app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes); 
app.use(authRoutes);



app.listen(3000, function(req, res){
	console.log("server started");
});
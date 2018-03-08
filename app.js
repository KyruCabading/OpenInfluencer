// INITIALIZERS
var express     = require("express"),
    app         = express(),
    bodyParser  = require ("body-parser"),
    mongoose    = require("mongoose"),
    Influencer = require("./models/influencer"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    faker = require("faker"),
    methodOverride = require("method-override"),
    flash = require("connect-flash");

var commentRoutes = require("./routes/comments"),
    influencerRoutes = require("./routes/influencers"),
    indexRoutes = require ("./routes/index");


// Local Database Connection
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/open_influencer");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "ilovebaby",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/influencers/:id/comments", commentRoutes);
app.use("/influencers", influencerRoutes);

// Deploy Online
app.listen(process.env.PORT, process.env.IP, function(){
    console.log(
      "Server initialized at " +
      process.env.IP +
      ". view site at " +
      process.env.PORT);
});

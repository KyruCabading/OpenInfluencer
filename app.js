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
app.use(require("cookie-session")({
    secret: "ilovebaby",
    resave: false,
    maxAge: 24 * 60 * 60 * 1000,
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


// Deploy
var server_port = process.env.PORT || 8080;
var server_ip_address = process.env.IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function(){
  console.log("Server initialized at " + server_ip_address + ". view site at http://localhost:" + server_port);
});

const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const PORT = process.env.PORT || 3300;

app
    .use('/', require("./routes"))
    .use(session({
        secret:"secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(AccessToken, refreshToken, profile, done){
    //User.findOrCreate({githubId: profile.id}, function (err, user){
        return done(null, profile);
    //});
}));

passport.serializeUser((user, done)=>{
    done(null, user);
});
passport.deserializeUser((user, done)=>{
    done(null, user);
});

app.get("/", (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : `Logged Out`)});
app.get("/github/callback", passport.authenticate("github", {
    failureRedirect: '/api-docs', session: false}),
(req, res)=>{
    req.session.user = req.user;
    res.redirect("/");
});

mongodb.initDb((err) =>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }
});
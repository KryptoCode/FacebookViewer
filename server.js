var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
var port = 3021;

app.use(session({secret: 'keyboardcat'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: '<enter client ID here>',
  clientSecret: '<Enter Client Secret here>',
  callbackURL: '<your domain>/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
	console.log(profile);
  return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/me', function(req, res) {
	res.send(req.user);
});

app.listen(port, function() {
	console.log("listening on port", port);
});
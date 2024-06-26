var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const expressSession=require("express-session")
const passport = require("passport")

const user =require("./module/user.js");
var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:"hllo"
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.serializeUser(usersRouter.serializeUser());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// passport.deserializeUser(usersRouter.deserializeUser());

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).populate('profile').populate('posts');
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
const passport = require('passport');
var router = express.Router();
const usermodel = require("../module/user")

// heart of authenticate
const localStrategy=require('passport-local');
passport.use(new localStrategy(usermodel.authenticate()));
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/profile", isloggedin, function (req, res) {
  res.send("welcome to profile");
});

//register route
router.post("/register",function(req,res){
  var userdata =new usermodel({
    username:req.body.username,
    // password:req.body.password
  })
  usermodel.register(userdata,req.body.password).then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/users/profile');
    })
  })
})
router.post("/login",passport.authenticate("local",{
  successRedirect:"/users/profile",
  failureRedirect:"/"
}),function (req,res){})

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/')
  })
})

function isloggedin(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/")
}

module.exports = router;

var express = require('express');
var router = express.Router();
const userModel= require("./users");
const postModel= require("./PostModel");
const passport = require('passport');
const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))


/* GET home page. */


router.get('/landing', isLoggedIn, async function(req, res) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  })
  .populate('posts')
  console.log(user);
  res.render('landing', {user});
});


router.get('/landing/:postId', (req, res) => {
  const postId = req.params.postId;
  
  res.json({ postId });
});

router.get('/login', function(req, res) {
  res.render('login', {error: req.flash('error')});
});

router.get('/aboutus', function(req, res) {
  res.render('aboutus');
});

router.get('/contact', function(req, res) {
  res.render('contact');
});


router.get('/add',isLoggedIn, async function(req, res) {
  const user = await userModel.findOne({username: req.session.passport.user})
  res.render('add');
});

router.post('/createpost',isLoggedIn, async function(req, res) {
  const user = await userModel.findOne({username: req.session.passport.user})
  const post = await postModel.create({
    user: user._id,
    title: req.body.title,
    description: req.body.description,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/landing")
});







router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/homepage', function(req, res) {
  res.render('index');
});


router.post("/register", function(req, res){
  var userdata = new userModel({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email
  });
  userModel.register(userdata, req.body.password)
  .then(function (registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/landing")
    })
  })
})

router.post("/login", passport.authenticate("local",{
  successRedirect: '/landing',
  failureRedirect: "/login",
  failureFlash: true,
}), function(req,res){ })


router.get("/logout", function(req, res, next){
  req.logout(function(err){
    if(err) { return next(err);}
    res.redirect("/homepage")
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}


module.exports = router;

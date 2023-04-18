const User = require('../models/user.js');
const fs  = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id)
      .then(user => {
        return res.render('user_profile', {
          title: 'User Profile',
          profile_user: user
        });
      })
      .catch(err => {
        console.log(err);
        return res.redirect('back');
      });
  }

  module.exports.update = async function(req, res){
    // try {
    //   if (req.user.id == req.params.id) {
    //     const user = await User.findById(req.params.id, req.body);
    //     return res.redirect('back');
    //   } else {
    //     return res.status(401).send('Unauthorized');
    //   }
    // } catch (err) {
    //   console.log(err);
    //   return res.status(500).send('Internal Server Error');
    // }

    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('*****Multer Error: ', err);
                }
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                     
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));

                    }

                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            })
            
        } catch (err) {
            req.flash('error',err);
            return res.redirect('back');
            
        }
    }
  }
  

//render the signup page
module.exports.signup = (req ,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/users/profile')
    }

    return res.render('user_sign_up', {
        title:'Connectify | Sign Up'
    })
}

//render the sing in page
module.exports.signin = (req ,res)=>{
    if(req.isAuthenticated()){
        console.log("already logged in");
        return res.redirect('/users/profile')
    }else{
        return res.render('user_sign_in', {
            title:'Connectify | Sign In'
        })
    }
    
}

//get the sign-up data
module.exports.create = (req, res)=>{
    //check weather password and confirm password are equal or not, if not then redirect to signup page
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    //check if the user already exists in the database, if yes then redirect to signin page
    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}

//sign in and create a session for the user
module.exports.createSession = (req,res)=>{
    req.flash('success','Logged in Successfully');
    //check if the user already exists in the database, if yes then redirect to signin page
    return res.redirect('/');
}

//signout or end a session 
module.exports.destroySession = (req,res)=>{

    // req.logout();
    // req.flash('success','Logged out Successfully');
    // return res.redirect('/');

    req.logout(function(err) {
        if(err) return next(err);
    req.flash('success','Logged out Successfully');
        return res.redirect('/');
    });
}
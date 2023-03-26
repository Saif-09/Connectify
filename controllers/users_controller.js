const User = require('../models/users')

// Exporting a function that handles the "profile" route
module.exports.profile = async (req, res) => {

    try {
      // Checking if the "user_id" cookie is present in the request
      if (req.cookies.user_id) {
  
        // Using the Mongoose "findById" function to find the user with the given ID
        const user = await User.findById(req.cookies.user_id).exec();
  
        if (user) {
          // If the user is found, render the "user_profile" template with the user's data
          res.render('user_profile', {
            user: user,
            title: 'Profile',
            
          });
        } else {
          // If the user is not found, redirect to the "sign-in" page
          res.redirect('/users/sign-in');
        }
      } else {
        // If the "user_id" cookie is not present, redirect to the "sign-in" page
        res.redirect('/users/sign-in');
      }
    } catch (err) {
      // If an error occurs, log it to the console and redirect to the "sign-in" page
      console.log(err);
      res.redirect('/users/sign-in');
    }
  }
  

//render the signup page
module.exports.signup = (req ,res)=>{
    return res.render('user_sign_up', {
        title:'Connectify | Sign Up'
    })
}

//render the sing in page
module.exports.signin = (req ,res)=>{
    return res.render('user_sign_in', {
        title:'Connectify | Sign In'
    })
}

//get the sign-up data
module.exports.create = (req, res)=>{
    //check weather password and confirm password are equal or not, if not then redirect to signup page
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    //check if the user already exists in the database, if yes then redirect to signin page
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return User.create(req.body);
        } else {
            throw new Error('User already exists');
        }
    })
    .then(user => {
        return res.redirect('/users/sign-in');
    })
    .catch(err => {
        console.log(err);
        return res.redirect('back');
    });
}

module.exports.createSession = (req,res)=>{
    //Were going to check if the user exists and if the user exists we'll check the password weather it is correct then match the passowrd in the form and 
    
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email})
    .then(user => {
        //check if the user exists
        if(user){
            //check if the password is not correct
            if(user.password != req.body.password){
                //if the password is not correct then redirect to signup page
                return res.redirect('back');

            }
            //check if the password is correct
            if(user.password === req.body.password){
                //create a session for the user
                res.cookie('user_id',user.id);
                //redirect to the home page
                return res.redirect('/users/profile');
                }
        }
    })
    .catch(err => {
        console.log('error in finding user',err);
        return res.redirect('back');
    });

//handle user found
//handle mismatching passwords 
//handle session creation
//handle user not found
}
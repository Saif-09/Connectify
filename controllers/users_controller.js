const user = require('../models/users')

module.exports.profile=(req, res)=>{
    return res.render('user_profile', {
        title:'User Profile'
    })
}
module.exports.signup = (req ,res)=>{
    return res.render('user_sign_up', {
        title:'Connectify | Sign Up'
    })
}

module.exports.signin = (req ,res)=>{
    return res.render('user_sign_in', {
        title:'Connectify | Sign In'
    })
}

//get the sign-up data
module.exports.create = (req, res)=>{
    //check weather password and confirm password are equal or not, if not then redirect to signup page
    if(req.body.password != req.body.confirm_password){
        return res.redirect('/signup');
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
    //to do 
}
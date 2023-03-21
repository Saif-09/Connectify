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
    //to do
}

module.exports.createSession = (req,res)=>{
    //to do
}
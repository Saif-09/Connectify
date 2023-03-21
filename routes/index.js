const express = require('express');
const router = express.Router();
const users  = require('./users');



const homeController = require('../controllers/home_controller');

router.get('/',homeController.home)
router.use('/users', users);
router.post('/user_sign_up', (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    user.save()
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        console.error(err);
        res.redirect('/signup');
      });
  });

  
module.exports = router;
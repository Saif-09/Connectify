const express = require('express');
const router = express.Router();
const users  = require('./users');
const posts = require('./posts');



const homeController = require('../controllers/home_controller');

router.get('/',homeController.home)
router.use('/users', users);
router.use('/posts', posts);


  
module.exports = router;
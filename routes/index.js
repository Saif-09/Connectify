const express = require('express');
const router = express.Router();
const users  = require('./users');
const posts = require('./posts');
const comments = require('./comments')



const homeController = require('../controllers/home_controller');

router.get('/',homeController.home)
router.use('/users', users);
router.use('/posts', posts);
router.use('/comments', comments);

router.use('/api', require('./api'));


  
module.exports = router;
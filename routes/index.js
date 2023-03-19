const express = require('express');
const router = express.Router();
const users  = require('./users');

const homeController = require('../controllers/home_controller');

router.get('/',homeController.home)
router.use('/users', users);

module.exports = router;
const express = require('express');
const router = express.Router();
// const passport = require('../config/passport-local-strategy')
const passport = require('passport');


const commentsController = require('../controllers/comment_controller')

router.post('/create', passport.checkAuthentication,commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports=router;

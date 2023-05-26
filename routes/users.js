const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controller');
const User = require('../models/user');

router.get('/profile', usersConrtoller.profile);

router.get('/sign-up',usersConrtoller.signUp);
router.get('/sign-in',usersConrtoller.signIn);

router.post('/create',usersConrtoller.create);
router.post('/create-session',usersConrtoller.createSession);
router.get('/signout',usersConrtoller.signout);
module.exports = router;
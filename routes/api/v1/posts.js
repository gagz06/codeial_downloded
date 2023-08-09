const express = require('express');
const passport = require('passport');
const router = express.Router();
const postsApi = require("../../../controllers/api/v1/posts_api");

router.get('/',postsApi.index);
// jwt is strategy and session false to avoid generating session cookies for api
router.delete('/:id',passport.authenticate('jwt',{session: false}),postsApi.destroy);


module.exports = router;
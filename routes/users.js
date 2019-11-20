const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user = require('../controllers/users');


// a simple test url to check that all of our files are communicating correctly.
router.post('/registration', user.UserRegistration);
router.post('/login', user.Login);
module.exports = router;
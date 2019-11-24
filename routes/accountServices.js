const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user = require('../controllers/users');
const middleware = require('../middleware/login')

// a simple test url to check that all of our files are communicating correctly.
router.post('/login', user.Login);
router.put('/deactivate/:user_id', middleware.verifyToken, user.deleteProfile)
router.put('/activate/:user_id', middleware.verifyToken, user.activateAccount)
module.exports = router;
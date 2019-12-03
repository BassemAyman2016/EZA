const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const resources = require('../controllers/resources');
const middleware = require('../middleware/login')

// a simple test url to check that all of our files are communicating correctly.
router.post('/:group_id', middleware.verifyToken, resources.addResource);
router.delete('/:resource_id/groups/:group_id', middleware.verifyToken, resources.removeResource);

module.exports = router;
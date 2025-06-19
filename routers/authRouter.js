const express = require("express");
const router = express.Router();
const { identifier}  = require('../middlewares/identification');

const authController = require('../controllers/authController');

router.post('/signin', authController.signin);
router.post('/signout', identifier, authController.signout);
router.post('/test', identifier, authController.testToken);
router.get('/check', identifier, authController.checkAuth);

module.exports = router;
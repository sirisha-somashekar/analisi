const router = require('express').Router();
const {verifyOTP, sendOTP, logout} = require('../controllers/auth');

// router.post('/login',login);
// router.post('/signup',signup);
router.post('/verifyOTP',verifyOTP);
router.post('/sendOTP',sendOTP);
router.post('/logout',logout);

module.exports = router;
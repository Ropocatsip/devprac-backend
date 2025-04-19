const express = require('express');
const { register, login, getMe, logout, verifyOTP, resendOTPCode } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);
router.post('/verifyOTP', verifyOTP);
router.post('/resendOTPCode', resendOTPCode);

//Force verify user account 
const User = require('../models/User'); // adjust the path if needed


// In your Express routes (e.g. auth.js)
router.patch('/force-verify', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { verified: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, user });
  });
  

module.exports = router;
const express = require('express');
const router = express.Router();
const { getMe, updateSteps, updateProfile, getUserWaterIntake, getUserExercises, updateUserWaterIntake, updateUserStats, updateUserExercises} = require('../controllers/userController');
const auth = require('../middleware/auth');

// Get user data
router.get('/me', auth, getMe);

// Update user steps
router.post('/steps', auth, updateSteps);

// Update user profile
router.put('/me', auth, updateProfile);

// get exercise data
router.get('/exercises', auth, getUserExercises);

// update exercise data
router.put('/exercises', auth, updateUserExercises);

// get water intake
router.get('/water-intake', auth, getUserWaterIntake);

// update water intake
router.put('/water-intake', auth, updateUserWaterIntake);

// update user stats 
router.put('/update-stats', auth, updateUserStats);

module.exports = router;
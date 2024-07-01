const User = require('../models/User');

// Get user data
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update user steps
exports.updateSteps = async (req, res) => {
    const { steps } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.steps = steps;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Update user profile
exports.updateProfile = async (req, res) => {
    const { height, weight, age } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.height = height;
        user.weight = weight;
        user.age = age;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
// Update user profile
exports.updateProfile = async (req, res) => {
    const { name, email, height, weight, age , goalSteps, currentStepCount } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (name) user.name = name;
        if (email) user.email = email;
        if (height) user.height = height;
        if (weight) user.weight = weight;
        if (age) user.age = age;
        if (goalSteps) user.goalSteps = goalSteps;
        if (currentStepCount) user.currentStepCount = currentStepCount;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// get water intake
exports.getUserWaterIntake = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({
        waterIntake: user.waterIntake || 0,
        drinkGoal: user.drinkGoal || 2000, // Default to 2000ml if not set
    });
};

// Update user water intake and drink goal
exports.updateUserWaterIntake = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const { waterIntake, drinkGoal } = req.body;

    if (waterIntake !== undefined) {
        user.waterIntake = waterIntake;
    }

    if (drinkGoal !== undefined) {
        user.drinkGoal = drinkGoal;
    }

    await user.save();

    res.status(200).json({
        waterIntake: user.waterIntake,
        drinkGoal: user.drinkGoal,
    });
};

// get user exercise data
exports.getUserExercises = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.json({
        exercises: user.exercises,
        totalCalories: user.exercises.reduce((total, exercise) => total + exercise.calories, 0),
    });
};

// update user exercise data
exports.updateUserExercises = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const { exercise } = req.body;

    user.exercises.push(exercise);
    await user.save();

    res.status(200).json(user.exercises);
};


// Update user stats and badges
exports.updateUserStats = async (req, res) => {
    const { badgeName, newValue, steps, waterIntake } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Initialize badges field if it doesn't exist
        if (!user.badges) {
            user.badges = {};
        }

        if (badgeName && newValue !== undefined) {
            user.badges[badgeName] = newValue;
        }

        if (steps !== undefined) {
            user.currentStepCount = steps;
            // Award step badges
            if (steps >= 10) user.badges['10Steps'] = true;
            if (steps >= 30) user.badges['30Steps'] = true;
            if (steps >= 50) user.badges['50Steps'] = true;
        }

        if (waterIntake !== undefined) {
            user.waterIntake = waterIntake;
            // Award water intake badges
            if (waterIntake >= 1000) user.badges['1000mlWater'] = true;
            if (waterIntake >= 2000) user.badges['2000mlWater'] = true;
            if (waterIntake >= 3000) user.badges['3000mlWater'] = true;
        }

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
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

// Update user exercise data
exports.updateExercise = async (req, res) => {
    const { calories, time } = req.body.exercise;
    try {
        const user = await User.findById(req.user.id);
        user.exerciseCalories = calories;
        user.exerciseTime = time;
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


// Update user stats and badges
exports.updateUserStats = async (req, res) => {
    const { steps, waterIntake } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (steps !== undefined) user.currentStepCount = steps;
        if (waterIntake !== undefined) user.waterIntake = waterIntake;

        // Unlock badges
        const { currentStepCount, waterIntake: currentWaterIntake, badges } = user;

        if (currentStepCount >= 1) badges['1000Steps'] = true;
        if (currentStepCount >= 10) badges['3000Steps'] = true;
        if (currentStepCount >= 30) badges['5000Steps'] = true;
 
        if (currentWaterIntake >= 100) badges['1000mlWater'] = true;
        if (currentWaterIntake >= 200) badges['2000mlWater'] = true;
        if (currentWaterIntake >= 300) badges['3000mlWater'] = true;

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

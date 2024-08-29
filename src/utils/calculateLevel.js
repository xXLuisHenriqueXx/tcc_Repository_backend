const User = require("../models/User");

const calculateLevel = async (userId) => {
    const user = await User.findById(userId);
    const baseXP = 20;
    const growthRate = 1.5;
    let experience = user.experience;
    let level = 1;
    let xpToNextLevel = baseXP;

    while (experience >= xpToNextLevel) {
        level++;
        
        experience -= xpToNextLevel;
        
        xpToNextLevel = Math.floor(baseXP * (level - 1 ** growthRate));

        console.log(`Level: ${level}, XP: ${experience}, XP to next level: ${xpToNextLevel}`);
    }

    if (user.level !== level) {
        user.level = level;
        user.experience = experience;
    }

    user.experienceToNextLevel = xpToNextLevel;

    await user.save();

    return level;
};

module.exports = calculateLevel;

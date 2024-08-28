const User = require("../models/User");

const calculateLevel = async (userId) => {
    const user = await User.findById(userId);
    const baseXP = 40;
    const growthRate = 1.5;
    let experience = user.experience;
    let level = 1;
    let xpToNextLevel = baseXP;
    let prevXpToNextLevel = 0;

    while (experience >= xpToNextLevel) {
        level++;
        experience -= xpToNextLevel;
        prevXpToNextLevel = xpToNextLevel;
        xpToNextLevel = Math.floor(baseXP * Math.pow(growthRate, level - 1));
    }

    if (user.level !== level) {
        user.level = level;
    }

    user.experienceToNextLevel = xpToNextLevel;
    user.prevExperienceToNextLevel = prevXpToNextLevel;

    await user.save();

    return level;
};

module.exports = calculateLevel;

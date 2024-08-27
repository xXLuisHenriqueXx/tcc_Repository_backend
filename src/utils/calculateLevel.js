const User = require("../models/User");

const calculateLevel = async (userId) => {
    const user = await User.findById(userId);
    const baseXP = 40;
    const growthRate = 1.5;
    let experience = user.experience;
    let level = 1;
    let xpToNextLevel = baseXP;

    while (experience >= xpToNextLevel) {
        level++;
        experience -= xpToNextLevel;
        xpToNextLevel = Math.floor(baseXP * Math.pow(growthRate, level - 1));

        user.xpToNextLevel = xpToNextLevel;
        await user.save();  // Save the updated experience to the database
    }

    if (user.level !== level) {
        user.level = level;
        await user.save();  // Save the updated user level to the database
    }

    return level;
}

module.exports = calculateLevel;

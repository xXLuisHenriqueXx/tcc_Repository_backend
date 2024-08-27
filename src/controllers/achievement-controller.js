const Achievement = require('../models/Achievement');
const User = require('../models/User');

const achievementController = {
    getAll: async (req, res) => {
        try {
            const achievements = await Achievement.find();

            return res.status(200).json(achievements);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = achievementController;
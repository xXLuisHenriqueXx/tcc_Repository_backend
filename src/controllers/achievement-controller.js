const Achievement = require('../models/Achievement');
const User = require('../models/User');

const achievementController = {
    create: async (req, res) => {
        const { title, description, expGiven } = req.body;

        if (!title || !description || !expGiven) return res.status(400).json({error: 'All fields are required'});

        try {
            const achievement = new Achievement({ title, description, expGiven });
            await achievement.save();

            return res.status(201).json(achievement);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },
    
    linkUser: async (req, res) => {
        const { _id } = req.params;
        const user = req.user._id;

        try {
            const achievement = await Achievement.findById(_id);
            
            if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
            
            user.achievements.push(achievement);
            await user.save();

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }

    }
}

module.exports = achievementController;
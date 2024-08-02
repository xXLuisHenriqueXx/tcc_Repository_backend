const User = require("../models/User")

module.exports = {
    update: async (req, res) => {
        try {
            const { name, email } = req.body;

            const user = req.user;

            if (name) user.name = name;
            if (email) user.email = email;

            await user.save();

            return res.status(204).end();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { password, newPassword } = req.body;

            const user = req.user;

            if (!user.checkPassword(password)) {
                return res.status(401).json({ error: "Invalid password" });
            }

            if (newPassword) user.password = newPassword;

            await user.save();

            return res.status(204).end();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },  
    
    show: async (req, res) => {
        const { _id } =  req.params;
        
        try {
            const user = await User.findById(_id);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}
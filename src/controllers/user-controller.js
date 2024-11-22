const User = require("../models/User");
const { updateUserValidationSchema, updatePasswordValidationSchema } = require("../schemas/userValidationSchema");

module.exports = {
    update: async (req, res) => {
        try {
            const validationResult = updateUserValidationSchema.safeParse(req.body);

            if (!validationResult.success) {
                return res.status(400).json({ error: validationResult.error.errors });
            }

            const { name, email } = validationResult.data;

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
            const validationResult = updatePasswordValidationSchema.safeParse(req.body);

            if (!validationResult.success) {
                return res.status(400).json({ error: validationResult.error.errors });
            }

            const { password, newPassword } = validationResult.data;

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
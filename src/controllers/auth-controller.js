require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;

module.exports = {  
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = new User({ name, email, password });
            await user.save();

            const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: "14d"});

            return res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    level: user.level,
                    experience: user.experience,
                    createdAt: user.createdAt,
                },
                token
            });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: "Invalid email" });
            }

            const isSame = user.checkPassword(password); // Método que compara a senha do usuário com a senha criptografada no banco de dados e retorna um booleano indicando se as senhas são iguais, caso sejam, retorna true, caso contrário, retorna false

            if (!isSame) {
                return res.status(400).json({ error: "Invalid password" });
            }

            const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: "14d" });

            return res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    level: user.level,
                    experience: user.experience,
                    createdAt: user.createdAt,
                },
                token
            });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },
}
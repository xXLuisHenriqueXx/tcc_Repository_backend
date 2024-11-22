require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../schemas/authValidationSchema');
const jwtSecret = process.env.JWT_KEY;

module.exports = {
    register: async (req, res) => {
        try {
            const validationResult = registerSchema.safeParse(req.body);

            if (!validationResult.success) {
                return res.status(400).json({ error: validationResult.error.errors });
            }
            
            const { name, email, password } = validationResult.data;
            const user = new User({ name, email, password });
            await user.save();

            const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: "14d" });

            return res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    achievements: user.achievements,
                    level: user.level,
                    experience: user.experience,
                    experienceToNextLevel: user.experienceToNextLevel,
                    numberCreateNotes: user.numberCreateNotes,
                    numberCreateTodos: user.numberCreateTodos,
                    numberCreateTasks: user.numberCreateTasks,
                    numberUpdateNotes: user.numberUpdateNotes,
                    numberUpdateTodos: user.numberUpdateTodos,
                    numberUpdateTasks: user.numberUpdateTasks,
                    numberDeleteNotes: user.numberDeleteNotes,
                    numberDeleteTodos: user.numberDeleteTodos,
                    numberDeleteTasks: user.numberDeleteTasks,
                    createdAt: user.createdAt,
                },
                token
            });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const validationResult = loginSchema.safeParse(req.body);

            if (!validationResult.success) {
                return res.status(400).json({ error: validationResult.error.errors });
            }

            const { email, password } = validationResult.data;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: "Invalid email" });
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
                    achievements: user.achievements,
                    level: user.level,
                    experience: user.experience,
                    experienceToNextLevel: user.experienceToNextLevel,
                    numberCreateNotes: user.numberCreateNotes,
                    numberCreateTodos: user.numberCreateTodos,
                    numberCreateTasks: user.numberCreateTasks,
                    numberUpdateNotes: user.numberUpdateNotes,
                    numberUpdateTodos: user.numberUpdateTodos,
                    numberUpdateTasks: user.numberUpdateTasks,
                    numberDeleteNotes: user.numberDeleteNotes,
                    numberDeleteTodos: user.numberDeleteTodos,
                    numberDeleteTasks: user.numberDeleteTasks,
                    createdAt: user.createdAt,
                },
                token
            });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
}
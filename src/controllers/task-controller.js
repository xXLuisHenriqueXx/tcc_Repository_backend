const mongoose = require("mongoose");
const calculateLevel = require('../utils/calculateLevel');
const checkTasksAchievements = require('../utils/checkTasksAchievements');

const TaskController = {
    add: async (req, res) => {
        try {
            const { title, done } = req.body;
            const user = req.user;

            const task = {
                _id: new mongoose.Types.ObjectId(),
                title,
                done
            }

            req.todo.tasks.push(task);

            await req.todo.save();

            await user.updateOne({ $inc: { numberCreateTasks: 1 } });
            await checkTasksAchievements.checkCreateAchievements(user.numberCreateTasks + 1, user._id);
            await calculateLevel(user._id);

            return res.status(201).json(task);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const { title } = req.body;
            const { taskId } = req.params;
            const user = req.user;

            const indexToUpdate = req.todo.tasks.findIndex(task => task._id == taskId);

            if (indexToUpdate === -1) {
                return res.status(404).json({ error: "Task not found" });
            }

            req.todo.tasks[indexToUpdate].title = title || req.todo.tasks[indexToUpdate].title;

            await req.todo.save();

            await user.updateOne({ $inc: { numberUpdateTasks: 1 } });
            await checkTasksAchievements.checkUpdateAchievements(user.numberUpdateTasks + 1, user._id);
            await calculateLevel(user._id);

            return res.status(200).json(req.todo.tasks[indexToUpdate]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    updateDone: async (req, res) => {
        try {
            const { done } = req.body;
            const { taskId } = req.params;
            const indexToUpdate = req.todo.tasks.findIndex(task => task._id == taskId);

            if (indexToUpdate === -1) {
                return res.status(404).json({ error: "Task not found" });
            }

            req.todo.tasks[indexToUpdate].done = done;

            await req.todo.save();

            return res.status(200).json(req.todo.tasks[indexToUpdate]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { taskId } = req.params;
            const user = req.user;

            const indexToDelete = req.todo.tasks.findIndex(task => task._id == taskId);

            if (indexToDelete === -1) {
                return res.status(404).json({ error: "Task not found" });
            }

            req.todo.tasks.splice(indexToDelete, 1);

            await req.todo.save();

            await user.updateOne({ $inc: { numberDeleteTasks: 1 } });
            await checkTasksAchievements.checkDeleteAchievements(user.numberDeleteTasks + 1, user._id);
            await calculateLevel(user._id);

            return res.status(204).send();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = TaskController;
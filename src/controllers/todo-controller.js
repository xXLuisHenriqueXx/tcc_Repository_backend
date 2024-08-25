const Todo = require('../models/Todo');
const calculateLevel = require('../utils/calculateLevel');
const checkTodosAchievements = require('../utils/checkTodosAchievements');

const todoController = {
  getTodos: async (req, res) => {
    const userId = req.user._id;

    try {
      const todos = await Todo.find({ user: userId });

      res.status(200).json(todos);

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  create: async (req, res) => {
    const { title } = req.body;
    const user = req.user;

    if (!title) return res.status(400).json({ error: 'Title are required' });

    try {
      const todo = new Todo({ title, user: user._id });
      await todo.save();

      await user.updateOne({ $inc: { numberCreateTodos: 1 } });
      await checkTodosAchievements.checkCreateTodoAchievements(user.numberCreateTodos, user._id);
      await calculateLevel(user._id);

      res.status(201).json(todo);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  update: async (req, res) => {
    const { title } = req.body;
    const { _id } = req.params;
    const user = req.user;

    try {
      const todo = await Todo.findById(_id);

      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
      }

      todo.title = title || todo.title;
      todo.updatedAt = Date.now();

      await todo.save();

      await user.updateOne({ $inc: { numberUpdateTodos: 1 } });
      await checkTodosAchievements.checkUpdateTodoAchievements(user.numberUpdateTodos, user._id);
      await calculateLevel(user._id);

      res.status(200).json(todo);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  delete: async (req, res) => {
    const { _id } = req.params;
    const user = req.user;

    try {
      const todo = await Todo.findById(_id);

      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
      }

      await todo.deleteOne({ _id: todo._id });

      await user.updateOne({ $inc: { numberDeleteTodos: 1 } });
      await checkTodosAchievements.checkDeleteTodoAchievements(user.numberDeleteTodos, user._id);
      await calculateLevel(user._id);

      res.status(204).json();
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
};

module.exports = todoController;
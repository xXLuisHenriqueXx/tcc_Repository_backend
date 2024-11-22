const Todo = require('../models/Todo');
const calculateLevel = require('../utils/calculateLevel');
const checkTodosAchievements = require('../utils/checkTodosAchievements');
const User = require('../models/User');
const { updateTodoValidationSchema, createTodoValidationSchema } = require('../schemas/todoValidationSchema');

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
    const userId = req.user._id;

    try {
      const validationResult = createTodoValidationSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.errors });
      }

      const { title, tasks } = validationResult.data;

      const todo = new Todo({ 
        title, 
        tasks: tasks || [],
        user: userId
      });
      await todo.save();

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { experience: 10, numberCreateTodos: 1 } },
        { new: true }
      )


      await checkTodosAchievements.checkCreateTodoAchievements(updatedUser.numberCreateTodos, userId);
      await calculateLevel(userId);

      res.status(201).json(todo);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  update: async (req, res) => {
    const { _id } = req.params;
    const userId = req.user._id;

    try {
      const todo = await Todo.findById(_id);

      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
      }

      const validationResult = updateTodoValidationSchema.safeParse(req.body);

      if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.errors });
      }

      const { title, tasks } = validationResult.data;

      todo.title = title || todo.title;
      todo.tasks = tasks || todo.tasks;
      todo.updatedAt = Date.now();

      await todo.save();

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { experience: 10, numberUpdateTodos: 1 } },
        { new: true }
      )

      await checkTodosAchievements.checkUpdateTodoAchievements(updatedUser.numberUpdateTodos, userId);
      await calculateLevel(userId);

      res.status(200).json(todo);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  },

  delete: async (req, res) => {
    const { _id } = req.params;
    const userId = req.user._id;

    try {
      const todo = await Todo.findById(_id);

      if (!todo) {
        return res.status(404).json({ msg: 'Todo not found' });
      }

      await todo.deleteOne({ _id: todo._id });

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { experience: 10, numberDeleteTodos: 1 } },
        { new: true }
      )

      await checkTodosAchievements.checkDeleteTodoAchievements(updatedUser.numberDeleteTodos, userId);
      await calculateLevel(userId);

      res.status(204).json();
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  }
};

module.exports = todoController;
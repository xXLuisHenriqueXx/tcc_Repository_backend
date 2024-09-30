const express = require('express');

const authController = require('./controllers/auth-controller');
const userController = require('./controllers/user-controller');
const alarmController = require('./controllers/alarm-controller');
const noteController = require('./controllers/note-controller');
const todoController = require('./controllers/todo-controller');
const taskController = require('./controllers/task-controller');
const achievementController = require('./controllers/achievement-controller');

const withAuth = require('./middlewares/auth');
const loadTodo = require('./middlewares/loadTodo');

const router = express.Router();

// Authentication routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// User routes
router.put('/profile', withAuth, userController.update);
router.put('/profile/password', withAuth, userController.updatePassword);
router.get('/user/:_id', withAuth, userController.show);

// Alarm routes
router.get('/alarm', withAuth, alarmController.getAlarms);
router.post('/alarm', withAuth, alarmController.create);
router.put('/alarm/:_id', withAuth, alarmController.update);
router.delete('/alarm/:_id', withAuth, alarmController.delete);
// router.put('/alarmstatus/:_id', withAuth, alarmController.updateStatus);

// Note routes
router.get('/note', withAuth, noteController.getNotes);
router.post('/note', withAuth, noteController.create);
router.put('/note/:_id', withAuth, noteController.update);
router.delete('/note/:_id', withAuth, noteController.delete);

// Todo routes
router.get('/todo', withAuth, todoController.getTodos);
router.post('/todo', withAuth, todoController.create);
router.put('/todo/:_id', withAuth, todoController.update);
router.delete('/todo/:_id', withAuth, todoController.delete);

// Task routes
router.post('/todo/:_id/task', withAuth, loadTodo, taskController.add);
router.put('/todo/:_id/task/:taskId', withAuth, loadTodo, taskController.update);
router.put('/todo/:_id/task/:taskId/done', withAuth, loadTodo, taskController.updateDone);
router.delete('/todo/:_id/task/:taskId', withAuth, loadTodo, taskController.delete);

// Achievement routes
router.get('/achievement', withAuth,achievementController.getAll);

module.exports = router;
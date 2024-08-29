require('dotenv').config();
const database = require('../../src/config/database');
const supertest = require('supertest');
const app = require('../../src/app');
const userFactory = require('../../src/models/factories/user-factory');
const todoFactory = require('../../src/models/factories/todo-factory');
const taskFactory = require('../../src/models/factories/task-factory');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;

describe('Task controller', () => {
    let connection;
    let user;
    let todo;
    let token;

    beforeAll(async () => {
        connection = await database.connect();
        connection.once('error', console.error.bind(console, 'MongoDB connection error:'));
    });

    beforeEach(async () => {
        await connection.dropCollection('todos');
        
        const userInput = userFactory.build();
        user = new connection.models.User(userInput);
        await user.save();

        const todoInput = todoFactory.build({ user: user._id });
        todo = new connection.models.Todo(todoInput);
        await todo.save();

        token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d'})
    });

    afterAll(async () => {
        await connection.dropCollection('todos');
        await connection.close();
    });

    test('should create a task', async () => {
        const taskInput = taskFactory.build();

        const response = await supertest(app)
            .post(`/todo/${todo._id}/task`)
            .set('Authorization', `Bearer ${token}`)
            .send(taskInput);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe(taskInput.title);
        expect(response.body.done).toBe(taskInput.done);

        const updatedUser = await connection.models.User.findById(user._id);

        expect(updatedUser.numberCreateTasks).toBe(1);
        expect(updatedUser.achievements.length).toBe(1);
        expect(updatedUser.level).toBe(2);

        const updatedTodo = await connection.models.Todo.findById(todo._id);
        expect(updatedTodo.tasks.length).toBe(1);
        expect(updatedTodo.tasks[0].title).toBe(taskInput.title);
    });

    test('should update a task title', async () => {
        const taskInput = taskFactory.build();
        todo.tasks.push(taskInput);
        await todo.save();

        const updatedTask = { title: "Updated title"};

        const response = await supertest(app)
            .put(`/todo/${todo._id}/task/${taskInput._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedTask);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedTask.title);
        expect(response.body.done).toBe(taskInput.done);

        const updatedUser = await connection.models.User.findById(user._id);

        expect(updatedUser.numberUpdateTasks).toBe(1);
        expect(updatedUser.achievements.length).toBe(1);
        expect(updatedUser.level).toBe(2);

        const updatedTodo = await connection.models.Todo.findById(todo._id);
        expect(updatedTodo.tasks[0].title).toBe(updatedTask.title);
        expect(updatedTodo.tasks[0].done).toBe(taskInput.done);
    });

    test('should update a task done status', async () => {
        const taskInput = taskFactory.build();
        todo.tasks.push(taskInput);
        await todo.save();

        const updatedTask = { done: true };

        const response = await supertest(app)
            .put(`/todo/${todo._id}/task/${taskInput._id}/done`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedTask);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe(taskInput.title);
        expect(response.body.done).toBe(updatedTask.done);

        const updatedTodo = await connection.models.Todo.findById(todo._id);
        expect(updatedTodo.tasks[0].title).toBe(taskInput.title);
        expect(updatedTodo.tasks[0].done).toBe(updatedTask.done);
    });

    test('should delete a task', async () => {
        const taskInput = taskFactory.build();
        todo.tasks.push(taskInput);
        await todo.save();

        const response = await supertest(app)
            .delete(`/todo/${todo._id}/task/${taskInput._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);

        const updatedUser = await connection.models.User.findById(user._id);

        expect(updatedUser.numberDeleteTasks).toBe(1);
        expect(updatedUser.achievements.length).toBe(1);
        expect(updatedUser.level).toBe(2);

        const updatedTodo = await connection.models.Todo.findById(todo._id);
        expect(updatedTodo.tasks.length).toBe(0);
    });
})
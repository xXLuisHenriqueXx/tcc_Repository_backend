require('dotenv').config();
const database = require('../../src/config/database');
const supertest = require('supertest');
const app = require('../../src/app');
const userFactory = require('../../src/models/factories/user-factory');
const todoFactory = require('../../src/models/factories/todo-factory');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;

describe('Todo controller', () => {
    let connection;
    let user;
    let token;

    beforeAll(async () => {
        connection = await database.connect();
        connection.once('error', console.error.bind(console, 'MongoDB connection error:'));
    });

    beforeEach(async () => {
        await connection.dropDatabase();
        const userInput = userFactory.build();
        user = new connection.models.User(userInput);
        await user.save();

        token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });
 
    test('should create a todo for an authenticated user', async () => {
        const todoInput = todoFactory.build({ user: user._id });

        const response = await supertest(app)
            .post('/todo')
            .set('Authorization', `Bearer ${token}`)
            .send(todoInput);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(todoInput.title);
        expect(response.body.user).toBe(user._id.toString());
    });

    test('should get all todos for an authenticated user', async () => {
        const todoInput = todoFactory.build({ user: user._id });
        const todo = new connection.models.Todo(todoInput);
        await todo.save();

        const response = await supertest(app)
            .get('/todo')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]._id).toBe(todo._id.toString());
        expect(response.body[0].title).toBe(todoInput.title);
    });

    test('should update a todo for an authenticated user', async () => {
        const todoInput = todoFactory.build({ user: user._id });
        const todo = new connection.models.Todo(todoInput);
        await todo.save();

        const newTitle = 'Updated title';
        const response = await supertest(app)
            .put(`/todo/${todo._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: newTitle });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(newTitle);
    });

    test('should delete a todo for an authenticated user', async () => {
        const todoInput = todoFactory.build({ user: user._id });
        const todo = new connection.models.Todo(todoInput);
        await todo.save();

        const response = await supertest(app)
            .delete(`/todo/${todo._id}`)
            .set('Authorization', `Bearer ${token}`);

        const todoDeleted = await connection.models.Todo.findById(todo._id);

        expect(response.statusCode).toBe(204);
        expect(todoDeleted).toBeNull();
    });
})
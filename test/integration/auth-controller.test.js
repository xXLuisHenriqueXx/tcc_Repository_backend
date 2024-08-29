const database = require('../../src/config/database');
const supertest = require('supertest');
const app = require('../../src/app');
const userFactory = require('../../src/models/factories/user-factory');

describe('Auth Controller', () => {
    let connection;

    beforeAll(async () => {
        connection = await database.connect();
        connection.once('error', console.error.bind(console, 'MongoDB connection error:'));
    })

    beforeEach(async () => {
        await connection.dropCollection('users');
    });

    afterAll(async () => {
        await connection.dropCollection('users');
        await connection.close();
    })

    test('should register a user with all fields', async () => {
        const userInput = userFactory.build();
        const response = await supertest(app).post('/register').send(userInput);
        const createdUser = await connection.models.User.findOne({ email: userInput.email });

        expect(response.statusCode).toBe(201);
        expect(createdUser._id).toBeDefined();
        expect(createdUser.name).toBe(userInput.name);
        expect(createdUser.email).toBe(userInput.email);
        expect(createdUser.password).not.toBe(userInput.password);
    })

    test('should register a user with only email and password', async () => {
        const userInput = {
            email: "user@email.com",
            password: "123456"
        }

        const response = await supertest(app).post('/register').send(userInput);
        const createdUser = await connection.models.User.findOne({ email: userInput.email });

        expect(response.statusCode).toBe(201);
        expect(createdUser._id).toBeDefined();
        expect(createdUser.email).toBe(userInput.email);
    });

    test('should return a login token when registering a user', async () => {
        const userInput = {
            email: "user@email.com",
            password: "123456"
        }

        const response = await supertest(app).post('/register').send(userInput);

        expect(response.statusCode).toBe(201);
        expect(response.body.user).toBeDefined();
        expect(response.body.user.email).toBe(userInput.email);
        expect(response.body.token).toBeDefined();
        expect(typeof response.body.token).toBe('string');
    });

    test('should not register a user without email', async () => {
        const userInput = {
            name: "User Name",
            password: "123456",
        }

        const response = await supertest(app).post('/register').send(userInput);
        const createdUser = await connection.models.User.findOne({ name: userInput.name });

        expect(response.statusCode).toBe(400);
        expect(createdUser).toBeNull();
    });

    test('should not register a user without password', async () => {
        const userInput = {
            name: "User Name",
            email: "user@email.com",
        }

        const response = await supertest(app).post('/register').send(userInput);
        const createdUser = await connection.models.User.findOne({ email: userInput.email });

        expect(response.statusCode).toBe(400);
        expect(createdUser).toBeNull();
    });

    test('should login a user with correct email and password', async () => {
        const userInput = userFactory.build();
        const user = new connection.models.User(userInput);
        await user.save();

        const { statusCode, body } = await supertest(app).post('/login').send({ email: userInput.email, password: userInput.password });

        expect(statusCode).toBe(200);
        expect(body.token).toBeDefined();
    });

    test('should not login a user with incorrect email', async () => {
        const userInput = userFactory.build();
        const user = new connection.models.User(userInput);
        await user.save();

        const { statusCode, body } = await supertest(app).post('/login').send({ email: 'test', password: userInput.password });

        expect(statusCode).toBe(401);
        expect(body.token).toBeUndefined();
    });

    test('should not login a user with incorrect password', async () => {
        const userInput = userFactory.build();
        const user = new connection.models.User(userInput);
        await user.save();

        const { statusCode, body } = await supertest(app).post('/login').send({ email: userInput.email, password: 'test' });

        expect(statusCode).toBe(400);
        expect(body.token).toBeUndefined();
    });
});
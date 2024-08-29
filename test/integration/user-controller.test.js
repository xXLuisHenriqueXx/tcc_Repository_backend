require('dotenv').config();
const database = require('../../src/config/database');
const supertest = require('supertest');
const app = require('../../src/app');
const userFactory = require('../../src/models/factories/user-factory');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;

describe('User Controller', () => {
    let connection;
    let token;
    let user = userFactory.build({ password: '123456' });

    beforeAll(async () => {
        connection = await database.connect();
        connection.once('error', console.error.bind(console, 'MongoDB connection error:'));
    })

    beforeEach(async () => {
        await connection.dropCollection('users');

        const userDoc = connection.models.User(user);
        await userDoc.save();

        if (!token) {
            token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });
        }
    });

    afterAll(async () => {
        await connection.dropCollection('users');
        await connection.close();
    })

    test('should update user profile', async () => {
        const response = await supertest(app)
            .put('/profile')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'New Name' });

        expect(response.statusCode).toBe(204);

        const updatedUser = await connection.models.User.findById(user._id);
        expect(updatedUser.name).toBe('New Name');
    });

    test('should update user password', async () => {
        const payload = { password: '123456', newPassword: 'qwe123' };

        const response = await supertest(app)
            .put('/profile/password')
            .set('Authorization', `Bearer ${token}`)
            .send(payload);

        const updatedUser = await connection.models.User.findById(user._id);

        expect(response.statusCode).toBe(204);
        expect(updatedUser.checkPassword('qwe123')).toBe(true);
    });

    test('should show user profile', async () => {
        const response = await supertest(app)
            .get(`/user/${user._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(user._id.toString());
        expect(response.body.name).toBe(user.name);
        expect(response.body.email).toBe(user.email);
    });
});
require('dotenv').config();
const database = require('../../src/config/database');
const userFactory = require('../../src/models/factories/user-factory');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;
const User = require('../../src/models/User');
const calculateLevel = require('../../src/utils/calculateLevel');

describe('Calcuate level', () => {
    let connection;
    let token;
    let user = userFactory.build({ password: '12345678' });

    beforeAll(async () => {
        connection = await database.connect();
        connection.once('error', console.error.bind(console, 'MongoDB connection error:'));
    })

    beforeEach(async () => {
        await connection.dropCollection('users');

        const userDoc = new User(user);
        await userDoc.save();

        if (!token) {
            token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });
        }
    });

    afterAll(async () => {
        await connection.dropCollection('users');
        await connection.close();
    })

    test('should level an user 5 times', async () => {
        const userTest = await connection.models.User.findById(user._id);

        userTest.experience = 200;
        await userTest.save();

        calculateLevel(userTest._id);

        const updatedUser = await connection.models.User.findById(user._id);

        console.log(updatedUser);

        expect(updatedUser.level).toBe(5);
    });
});
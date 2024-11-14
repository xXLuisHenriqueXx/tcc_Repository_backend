require('dotenv').config();
const database = require('../../src/config/database');
const supertest = require('supertest');
const app = require('../../src/app');
const userFactory = require('../../src/models/factories/user-factory');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;

describe('Alarm Controller', () => {
    let connection;
    let user;
    let token;

    beforeAll(async () => {
        connection = await database.connect();
        connection.once('error', console.error.bind(console, 'MongoDB connection error:'));
    });

    beforeEach(async () => {
        await connection.dropCollection('alarms');
        
        const userInput = userFactory.build();
        user = new connection.models.User(userInput);
        await user.save();

        token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });
    });

    afterAll(async () => {
        await connection.dropCollection('alarms');
        await connection.close();
    });

    test('should create an alarm without days for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: null,
            status: true
        };

        const response = await supertest(app)
            .post('/alarm')
            .set('Authorization', `Bearer ${token}`)
            .send(alarmInput);

        expect(response.status).toBe(201);
        expect(response.body.alarm.title).toBe(alarmInput.title);
        expect(new Date(response.body.alarm.hour).toISOString()).toBe(alarmInput.hour.toISOString());
        expect(response.body.alarm.days).toEqual(alarmInput.days);
        expect(response.body.alarm.date).toBeDefined();
        expect(response.body.alarm.user).toBe(user._id.toString());
        expect(response.body.nextAlarmId).toBeDefined();
    });

    test('should create an alarm with days for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: true,
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true
            },
            date: null,
            status: true
        };

        const response = await supertest(app)
            .post('/alarm')
            .set('Authorization', `Bearer ${token}`)
            .send(alarmInput);

        expect(response.status).toBe(201);
        expect(response.body.alarm.title).toBe(alarmInput.title);
        expect(new Date(response.body.alarm.hour).toISOString()).toBe(alarmInput.hour.toISOString());
        expect(response.body.alarm.days).toEqual(alarmInput.days);
        expect(response.body.alarm.date).toBeNull();
        expect(response.body.alarm.user).toBe(user._id.toString());
        expect(response.body.nextAlarmId).toBeDefined();
    });

    test('should create an alarm with another date for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: new Date("2024-10-06T08:00:00Z"),
            status: true
        };

        const response = await supertest(app)
            .post('/alarm')
            .set('Authorization', `Bearer ${token}`)
            .send(alarmInput);

        expect(response.status).toBe(201);
        expect(response.body.alarm.title).toBe(alarmInput.title);
        expect(new Date(response.body.alarm.hour).toISOString()).toBe(alarmInput.hour.toISOString());
        expect(response.body.alarm.days).toEqual(alarmInput.days);
        expect(response.body.alarm.date).toBeDefined();
        expect(response.body.alarm.user).toBe(user._id.toString());
        expect(response.body.nextAlarmId).toBeDefined();
    });

    test('should not create an alarm without title for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: null,
            status: true
        };

        const response = await supertest(app)
            .post('/alarm')
            .set('Authorization', `Bearer ${token}`)
            .send(alarmInput);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Title and hour are required');
    });

    test('should update an alarm with days for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: null,
            status: true,
            user: user._id
        };

        const alarm = await connection.models.Alarm(alarmInput);
        await alarm.save();

        const newAlarmInput = {
            title: 'Wake up early',
            hour: new Date("2024-10-06T08:00:00Z"),
            days: {
                sunday: true,
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true
            },
            date: null,
            status: true
        };

        const response = await supertest(app)
            .put(`/alarm/${alarm._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(newAlarmInput);

        expect(response.status).toBe(200);
        expect(response.body.alarm.title).toBe(newAlarmInput.title);
        expect(new Date(response.body.alarm.hour).toISOString()).toBe(newAlarmInput.hour.toISOString());
        expect(response.body.alarm.days).toEqual(newAlarmInput.days);
        expect(response.body.alarm.date).toBeNull();
        expect(response.body.alarm.user).toBe(user._id.toString());
        expect(response.body.nextAlarmId).toBeDefined();
    });

    test('should update an alarm without days for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: null,
            status: true,
            user: user._id
        };

        const alarm = await connection.models.Alarm(alarmInput);
        await alarm.save();

        const newAlarmInput = {
            title: 'Wake up early',
            hour: new Date("2024-10-06T08:00:00Z"),
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: null,
            status: true
        };

        const response = await supertest(app)
            .put(`/alarm/${alarm._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(newAlarmInput);

        expect(response.status).toBe(200);
        expect(response.body.alarm.title).toBe(newAlarmInput.title);
        expect(new Date(response.body.alarm.hour).toISOString()).toBe(newAlarmInput.hour.toISOString());
        expect(response.body.alarm.days).toEqual(newAlarmInput.days);
        expect(response.body.alarm.date).toBeDefined();
        expect(response.body.alarm.user).toBe(user._id.toString());
        expect(response.body.nextAlarmId).toBeDefined();
    });

    test('should update an alarm with another date for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: null,
            status: true,
            user: user._id
        };

        const alarm = await connection.models.Alarm(alarmInput);
        await alarm.save();

        const newAlarmInput = {
            title: 'Wake up early',
            hour: new Date("2024-10-06T08:00:00Z"),
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: new Date("2024-10-06T08:00:00Z"),
            status: true
        };

        const response = await supertest(app)
            .put(`/alarm/${alarm._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(newAlarmInput);

        expect(response.status).toBe(200);
        expect(response.body.alarm.title).toBe(newAlarmInput.title);
        expect(new Date(response.body.alarm.hour).toISOString()).toBe(newAlarmInput.hour.toISOString());
        expect(response.body.alarm.days).toEqual(newAlarmInput.days);
        expect(response.body.alarm.date).toBeDefined();
        expect(response.body.alarm.user).toBe(user._id.toString());
        expect(response.body.nextAlarmId).toBeDefined();
    });

    test('should delete an alarm for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: null,
            status: true,
            user: user._id
        };

        const alarm = await connection.models.Alarm(alarmInput);
        await alarm.save();

        const response = await supertest(app)
            .delete(`/alarm/${alarm._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });

    test('should update an alarm status for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: null,
            status: true,
            user: user._id
        };

        const alarm = await connection.models.Alarm(alarmInput);
        await alarm.save();

        const response = await supertest(app)
            .put(`/alarm/${alarm._id}/status`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.alarm.status).toBe(false);
        expect(response.body.nextAlarmId).toBeDefined();
    });

    expect('should get the schedule notification data with a date for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false
            },
            date: new Date("2024-10-06T08:00:00Z"),
            status: true,
            user: user._id
        };

        const alarm = await connection.models.Alarm(alarmInput);
        await alarm.save();

        const response = await supertest(app)
            .get(`/alarm/${alarm._id}/notification`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.notification.title).toBe(alarm.title);
        expect(new Date(response.body.notification.date).toISOString()).toBe(alarm.date.toISOString());
    });

    expect('should get the schedule notification data with days for an authenticated user', async () => {
        const alarmTime = new Date();
        alarmTime.setHours(7);
        alarmTime.setMinutes(0);

        const alarmInput = {
            title: 'Wake up',
            hour: alarmTime,
            days: {
                sunday: false,
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: true
            },
            date: null,
            status: true,
            user: user._id
        };

        const alarm = await connection.models.Alarm(alarmInput);
        await alarm.save();

        const response = await supertest(app)
            .get(`/alarm/${alarm._id}/notification`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.notification.title).toBe(alarm.title);
        expect(new Date(response.body.notification.date).toISOString()).toBe(alarm.hour.toISOString());
    });
});
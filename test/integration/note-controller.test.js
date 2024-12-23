require('dotenv').config();
const database = require('../../src/config/database');
const supertest = require('supertest');
const app = require('../../src/app');
const userFactory = require('../../src/models/factories/user-factory');
const noteFactory = require('../../src/models/factories/note-factory');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_KEY;

describe('Note Controller', () => {
    let connection;
    let user;
    let token;

    beforeAll(async () => {
        connection = await database.connect();
        connection.once('error', console.error.bind(console, 'MongoDB connection error:'));
    });

    beforeEach(async () => {
        await connection.dropCollection('notes');
        
        const userInput = userFactory.build();
        user = new connection.models.User(userInput);
        await user.save();

        token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });
    });

    afterAll(async () => {
        await connection.dropCollection('notes');
        await connection.close();
    });

    test('should create a note for an authenticated user', async () => {
        const noteInput = noteFactory.build({ user: user._id });

        const response = await supertest(app)
            .post('/note')
            .set('Authorization', `Bearer ${token}`)
            .send(noteInput);

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(noteInput.title);
        expect(response.body.content).toBe(noteInput.content);
        expect(response.body.user).toBe(user._id.toString());

        const updatedUser = await connection.models.User.findById(user._id);

        expect(updatedUser.numberCreateNotes).toBe(1);
        expect(updatedUser.achievements.length).toBe(1);
        expect(updatedUser.level).toBe(1);
    });

    test('should get all notes for an authenticated user', async () => {
        const noteInput = noteFactory.build({ user: user._id });
        const note = new connection.models.Note(noteInput);
        await note.save();

        const response = await supertest(app)
            .get('/note')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]._id).toBe(note._id.toString());
        expect(response.body[0].title).toBe(noteInput.title);
        expect(response.body[0].content).toBe(noteInput.content);
    });

    test('should update a note for an authenticated user', async () => {
        const noteInput = noteFactory.build({ user: user._id });
        const note = new connection.models.Note(noteInput);
        await note.save();

        const updatedNote = { 
            title: 'update title', 
            content: 'update content' 
        };

        const response = await supertest(app)
            .put(`/note/${note._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedNote);

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(updatedNote.title);
        expect(response.body.content).toBe(updatedNote.content);

        const updatedUser = await connection.models.User.findById(user._id);

        expect(updatedUser.numberUpdateNotes).toBe(1);
        expect(updatedUser.achievements.length).toBe(1);
        expect(updatedUser.level).toBe(1);
    });

    test('should delete a note for an authenticated user', async () => {
        const noteInput = noteFactory.build({ user: user._id });
        const note = new connection.models.Note(noteInput);
        await note.save();

        const response = await supertest(app)
            .delete(`/note/${note._id}`)
            .set('Authorization', `Bearer ${token}`);

        const deletedNote = await connection.models.Note.findById(note._id);

        expect(response.statusCode).toBe(204);
        expect(deletedNote).toBeNull();

        const updatedUser = await connection.models.User.findById(user._id);

        expect(updatedUser.numberDeleteNotes).toBe(1);
        expect(updatedUser.achievements.length).toBe(1);
        expect(updatedUser.level).toBe(1);
    });

    test('should create 5 notes, receive 2 achievements and level up', async () => {
        const noteInput = noteFactory.build({ user: user._id });

        for (let i = 0; i < 5; i++) {
            await supertest(app)
                .post('/note')
                .set('Authorization', `Bearer ${token}`)
                .send(noteInput);
        }

        const updatedUser = await connection.models.User.findById(user._id);

        expect(updatedUser.numberCreateNotes).toBe(5);
        expect(updatedUser.achievements.length).toBe(2);
        expect(updatedUser.level).toBe(2);
    });
});

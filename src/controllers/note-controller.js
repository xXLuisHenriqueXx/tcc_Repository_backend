const Note = require('../models/Note');
const calculateLevel = require('../utils/calculateLevel');
const checkNotesAchievements = require('../utils/checkNotesAchievements');
const User = require('../models/User');
const { createNoteValidationSchema, updateNoteValidationSchema } = require('../schemas/noteValidationSchema');

const noteController = {
    getNotes: async (req, res) => {
        const userId = req.user._id;

        try {
            const notes = await Note.find({ user: userId });

            return res.status(200).json(notes);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        const userId = req.user._id;

        try {
            const validationResult = createNoteValidationSchema.safeParse(req.body);

            if (!validationResult.success) {
                return res.status(400).json({ error: validationResult.error.errors });
            }

            const { title, content } = validationResult.data;

            const note = new Note({ title, content, user: userId });
            await note.save();

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $inc: { experience: 10, numberCreateNotes: 1 } },
                { new: true }
            )

            await checkNotesAchievements.checkCreateNoteAchievements(updatedUser.numberCreateNotes, userId);
            await calculateLevel(userId);

            return res.status(201).json(note);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { _id } = req.params;
        const userId = req.user._id;

        try {
            const note = await Note.findById(_id);

            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }

            const validationResult = updateNoteValidationSchema.safeParse(req.body);

            if (!validationResult.success) {
                return res.status(400).json({ error: validationResult.error.errors });
            }

            const { title, content } = validationResult.data;

            note.title = title || note.title;
            note.content = content || note.content;
            note.updatedAt = Date.now();
            
            await note.save();

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $inc: { experience: 10, numberUpdateNotes: 1 } },
                { new: true }
            )
            
            await checkNotesAchievements.checkUpdateNoteAchievements(updatedUser.numberUpdateNotes, userId);
            await calculateLevel(userId);

            return res.status(200).json(note);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        const { _id } = req.params;
        const userId = req.user._id;

        try {
            const note = await Note.findById(_id);

            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            
            await note.deleteOne({ _id: note._id });

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $inc: { experience: 10, numberDeleteNotes: 1 } },
                { new: true }
            )

            await checkNotesAchievements.checkDeleteNoteAchievements(updatedUser.numberDeleteNotes, userId);
            await calculateLevel(userId);

            return res.status(204).json();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = noteController;
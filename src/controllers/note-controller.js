const Note = require('../models/Note');

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
        const { title, content } = req.body;
        const user = req.user._id;

        if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

        try {
            const note = new Note({ title, content, user });
            await note.save();

            return res.status(201).json(note);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { title, content } = req.body;
        const { _id } = req.params;

        try {
            const note = await Note.findById(_id);

            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }

            note.title = title || note.title;
            note.content = content || note.content;
            note.updatedAt = Date.now();
            
            await note.save();

            return res.status(200).json(note);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        const { _id } = req.params;

        try {
            const note = await Note.findById(_id);

            if (!note) {
                return res.status(404).json({ error: 'Note not found' });
            }
            
            await note.deleteOne({ _id: note._id });

            return res.status(204).json();
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = noteController;
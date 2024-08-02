const Todo = require('../models/Todo');

const loadTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params._id);

        if (!todo) return res.status(404).json({ error: 'Todo not found' });

        req.todo = todo;
        next();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = loadTodo;
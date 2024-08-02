const { Schema, model, default: mongoose } = require("mongoose");

const todoSchema = new Schema({
    title: { type: String, required: true },
    tasks: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        title: { type: String, required: true },
        done: { type: Boolean, default: false }
    }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Todo = model("Todo", todoSchema);
module.exports = Todo;
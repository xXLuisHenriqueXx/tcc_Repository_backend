const { Schema, model } = require("mongoose");

const achievementSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirement: { type: String, required: true },
    type: { type: String, required: true },
    imageUrl: { type: String, required: true },
    expGiven: { type: Number, required: true },
});

const Achievement = model("Achievement", achievementSchema);
module.exports = Achievement;
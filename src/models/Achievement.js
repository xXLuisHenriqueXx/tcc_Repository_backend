const { Schema, model } = require("mongoose");

const achievementSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    expGiven: { type: Number, required: true },
});

const Achievement = model("Achievement", achievementSchema);
module.exports = Achievement;
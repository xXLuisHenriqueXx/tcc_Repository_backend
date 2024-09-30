const { Schema, model, default: mongoose } = require("mongoose");

const AlarmSchema = new Schema({
    title: { type: String, required: true },
    hour: { type: Date, required: true },
    days: {
        sunday: { type: Boolean, default: false },
        monday: { type: Boolean, default: false },
        tuesday: { type: Boolean, default: false },
        wednesday: { type: Boolean, default: false },
        thursday: { type: Boolean, default: false },
        friday: { type: Boolean, default: false },
        saturday: { type: Boolean, default: false },
    },
    date: { type: Date },
    status: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Alarm = model("Alarm", AlarmSchema);
module.exports = Alarm;
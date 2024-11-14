const Alarm = require("../models/Alarm");
const User = require("../models/User");
const calculateNextAlarmDate = require('../helpers/calculateNextAlarmDate');
const checkAlarmsAchievements = require("../utils/checkAlarmsAchievements");
const calculateLevel = require("../utils/calculateLevel");
const calculateNextAlarm = require("../utils/calculateNextAlarm");
const calculateAlarmDay = require("../utils/calculateAlarmDay");

const alarmController = {
    getAlarms: async (req, res) => {
        const userId = req.user._id;

        try {
            const alarms = await Alarm.find({ user: userId });

            const nextAlarmId = await calculateNextAlarm(userId);
        
            res.status(200).json({ alarms, nextAlarmId });

        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    },

    create: async (req, res) => {
        const { title, hour, days, date } = req.body;
        const userId = req.user._id;

        if (!title || !hour) return res.status(400).json({ error: 'Title and hour are required' });

        try {
            let finalDate = date ? new Date(date) : null;
            if (isNaN(finalDate)) return res.status(400).json({ error: 'Invalid date format' });

            const daysSelected = Object.values(days).some(day => day);

            if (!daysSelected && !finalDate) {
                finalDate = calculateNextAlarmDate(hour);
            }

            const alarm = new Alarm({ title, hour, days, date: finalDate, user: userId });
            await alarm.save();

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $inc: { experience: 10, numberCreateAlarms: 1 } },
                { new: true }
            )

            await checkAlarmsAchievements.checkCreateAlarmsAchievements(updatedUser.numberCreateAlarms, userId);
            await calculateLevel(userId);

            const nextAlarmId = await calculateNextAlarm(userId);

            res.status(201).json({ alarm, nextAlarmId });
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { title, hour, days, date } = req.body;
        const { _id } = req.params;
        const userId = req.user._id;

        try {
            const alarm = await Alarm.findById(_id);

            if (!alarm) {
                return res.status(404).json({ msg: 'Alarm not found' });
            }

            alarm.title = title || alarm.title;
            alarm.hour = hour || alarm.hour;
            alarm.days = days || alarm.days;

            const daysSelected = Object.values(days).some(day => day);
            if (daysSelected) {
                alarm.date = null;

            } else if (!daysSelected && !date) {
                alarm.date = date || calculateNextAlarmDate(hour);

            } else {
                alarm.date = date || alarm.date;
            }

            alarm.updatedAt = Date.now();

            await alarm.save();

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $inc: { experience: 10, numberUpdateAlarms: 1 } },
                { new: true }
            )

            await checkAlarmsAchievements.checkUpdateAlarmsAchievements(updatedUser.numberUpdateAlarms, userId);
            await calculateLevel(userId);

            const nextAlarmId = await calculateNextAlarm(userId);

            res.status(200).json({ alarm, nextAlarmId });
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    },

    delete: async (req, res) => {
        const { _id } = req.params;
        const userId = req.user._id;

        try {
            const alarm = await Alarm.findById(_id);

            if (!alarm) {
                return res.status(404).json({ msg: 'Alarm not found' });
            }

            await alarm.deleteOne({ _id: alarm._id });

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $inc: { experience: 10, numberDeleteAlarms: 1 } },
                { new: true }
            )

            await checkAlarmsAchievements.checkDeleteAlarmsAchievements(updatedUser.numberDeleteAlarms, userId);
            await calculateLevel(userId);

            const nextAlarmId = await calculateNextAlarm(userId);

            res.status(204).json({ msg: 'Alarm deleted', nextAlarmId });
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    },

    toggleAlarmStatus: async (req, res) => {
        const { _id } = req.params;
        const userId = req.user._id;

        try {
            const alarm = await Alarm.findById(_id);

            if (!alarm) {
                return res.status(404).json({ msg: 'Alarm not found' });
            }

            alarm.status = !alarm.status;
            await alarm.save();

            const nextAlarmId = await calculateNextAlarm(userId);

            res.status(200).json({ alarm, nextAlarmId });
        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    },

    getScheduleNotificationData: async (req, res) => {
        const { _id } = req.params;
        const userId = req.user._id;

        try {
            const alarm = await Alarm.findById(_id);

            if (!alarm) {
                return res.status(404).json({ msg: 'Alarm not found' });
            }

            const nextAlarmDate = await calculateAlarmDay(alarm);

            const notificationData = {
                title: alarm.title,
                body: `Seu alarme ${alarm.title} está chamando!`,
                date: nextAlarmDate,
            };

            res.status(200).json(notificationData);
        } catch (error) {
            res.status(400).send({ error: err.message });
        }
    }
}

module.exports = alarmController;
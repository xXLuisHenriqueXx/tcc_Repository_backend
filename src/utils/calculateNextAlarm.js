const Alarm = require('../models/Alarm');

const calculateNextAlarm = async (userId) => {
    const alarms = await Alarm.find({ user: userId });

    if (alarms.length === 0) {
        return null;
    }

    let nextAlarm = null;
    let nextAlarmDate = null;

    alarms.forEach(alarm => {
        let alarmDate = null;
        const hour = new Date(alarm.hour).getHours();
        const minute = new Date(alarm.hour).getMinutes();

        if (alarm.status) {
            if (alarm.date) {
                alarmDate = new Date(alarm.date);
                alarmDate.setHours(hour, minute, 0, 0);
            } else {
                const now = new Date();
    
                for (let i = 0; i < 7; i++) {
                    const day = (now.getDay() + i) % 7;
                    if (alarm.days[Object.keys(alarm.days)[day]]) {
                        alarmDate = new Date(now);
                        alarmDate.setDate(now.getDate() + i);
                        alarmDate.setHours(hour, minute, 0, 0);
                        break;
                    }
                }
            }
        }

        if (alarmDate && (!nextAlarmDate || alarmDate < nextAlarmDate)) {
            nextAlarmDate = alarmDate;
            nextAlarm = alarm;
        }
    });
    
    return nextAlarm ? nextAlarm._id : null;
};

module.exports = calculateNextAlarm;
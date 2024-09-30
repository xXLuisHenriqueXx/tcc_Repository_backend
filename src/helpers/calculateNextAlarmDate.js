const calculateNextAlarmDate = (hour) => {
    const now = new Date();
    const alarmHour = new Date(hour);

    if (now.getTime() >= alarmHour.getTime()) {
        alarmHour.setDate(now.getDate() + 1);
    }

    return alarmHour;
};

module.exports = calculateNextAlarmDate;
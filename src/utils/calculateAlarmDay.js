const calculateAlarmDay = (alarm) => {
    const now = new Date();

    if (alarm.date) {
        return new Date(alarm.date);
    }

    const daysOfWeek = [];
    if (alarm.days.sunday) daysOfWeek.push(0);
    if (alarm.days.monday) daysOfWeek.push(1);
    if (alarm.days.tuesday) daysOfWeek.push(2);
    if (alarm.days.wednesday) daysOfWeek.push(3);
    if (alarm.days.thursday) daysOfWeek.push(4);
    if (alarm.days.friday) daysOfWeek.push(5);
    if (alarm.days.saturday) daysOfWeek.push(6);

    if (daysOfWeek.length > 0) {
        const currentDay = now.getDay();
        daysOfWeek.sort();

        for (let i = 0; i < daysOfWeek.length; i++) {
            if (daysOfWeek[i] >= currentDay) {
                const daysUntilNextAlarm = daysOfWeek[i] - currentDay;
                const nextAlarmDate = new Date(now);
                nextAlarmDate.setDate(now.getDate() + daysUntilNextAlarm);
                return nextAlarmDate;
            }
        }

        const daysUntilNextAlarm = 7 - currentDay + daysOfWeek[0];
        const nextAlarmDate = new Date(now);
        nextAlarmDate.setDate(now.getDate() + daysUntilNextAlarm);
        return nextAlarmDate;
    }

    return null;
};

module.exports = calculateAlarmDay;
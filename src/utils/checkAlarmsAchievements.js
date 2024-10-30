const Achievement = require("../models/Achievement");
const User = require("../models/User");

const checkAlarmsAchievements = {
    checkCreateAlarmsAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_ALARM_1" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_ALARM_5" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_ALARM_10" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_ALARM_20" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_ALARM_30" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }
    },

    checkUpdateAlarmsAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_ALARM_1" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_ALARM_5" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_ALARM_10" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_ALARM_20" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_ALARM_30" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }
    },

    checkDeleteAlarmsAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_ALARM_1" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_ALARM_5" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_ALARM_10" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_ALARM_20" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_ALARM_30" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }
    }
}

module.exports = checkAlarmsAchievements;
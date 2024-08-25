const Achievement = require("../models/Achievement");
const User = require("../models/User");

const checkTodosAchievements = {
    checkCreateTodoAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TODO_1" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TODO_5" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TODO_10" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TODO_20" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TODO_30" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }
    },

    checkUpdateTodoAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TODO_1" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TODO_5" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TODO_10" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TODO_20" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TODO_30" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }
    },

    checkDeleteTodoAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TODO_1" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TODO_5" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TODO_10" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TODO_20" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TODO_30" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }
    }
}

module.exports = checkTodosAchievements;
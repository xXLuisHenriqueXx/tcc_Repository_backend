const Achievement = require("../models/Achievement");
const User = require("../models/User");

const checkTasksAchievements = {
    checkCreateAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TASK_1" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TASK_5" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TASK_10" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TASK_20" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_TASK_30" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }
    },

    checkUpdateAchievements: async (count, userId) => {
        const user = await User.findById(userId);
    
        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TASK_1" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TASK_5" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TASK_10" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TASK_20" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_TASK_30" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }
    },

    checkDeleteAchievements: async (count, userId) => {
        const user = await User.findById(userId);
    
        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TASK_1" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TASK_5" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TASK_10" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TASK_20" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_TASK_30" });
    
            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }
    }
}

module.exports = checkTasksAchievements;
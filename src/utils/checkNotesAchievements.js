const Achievement = require("../models/Achievement");
const User = require("../models/User");

const checkNotesAchievements = {
    checkCreateNoteAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_NOTE_1" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_NOTE_5" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_NOTE_10" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_NOTE_20" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "CREATED_NOTE_30" })

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id)
                user.experience += achievement.expGiven
                await user.save()
            }
        }
    },

    checkUpdateNoteAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_NOTE_1" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_NOTE_5" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_NOTE_10" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_NOTE_20" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "UPDATED_NOTE_30" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }
    },

    checkDeleteNoteAchievements: async (count, userId) => {
        const user = await User.findById(userId);

        if (count === 1) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_NOTE_1" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 5) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_NOTE_5" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 10) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_NOTE_10" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 20) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_NOTE_20" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }

        if (count === 30) {
            const achievement = await Achievement.findOne({ requirement: "DELETED_NOTE_30" });

            if (!user.achievements.includes(achievement._id)) {
                user.achievements.push(achievement._id);
                user.experience += achievement.expGiven;
                await user.save();
            }
        }
    }
}

module.exports = checkNotesAchievements;
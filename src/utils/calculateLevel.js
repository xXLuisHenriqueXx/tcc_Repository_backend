const User = require("../models/User");

const levelsRequirements = [
    {
        level: 1,
        experience: 20
    },
    {
        level: 2,
        experience: 30
    },
    {
        level: 3,
        experience: 40
    },
    {
        level: 4,
        experience: 50
    },
    {
        level: 5,
        experience: 60
    },
    {
        level: 6,
        experience: 70
    },
    {
        level: 7,
        experience: 80
    },
    {
        level: 8,
        experience: 90
    },
    {
        level: 9,
        experience: 100
    },
    {
        level: 10,
        experience: 110
    },
    {
        level: 11,
        experience: 120
    },
    {
        level: 12,
        experience: 130
    },
    {
        level: 13,
        experience: 140
    },
    {
        level: 14,
        experience: 150
    },
    {
        level: 15,
        experience: 160
    },
    {
        level: 16,
        experience: 170
    },
    {
        level: 17,
        experience: 180
    },
    {
        level: 18,
        experience: 190
    },
    {
        level: 19,
        experience: 200
    },
    {
        level: 20,
        experience: 210
    },
    {
        level: 21,
        experience: 220
    },
    {
        level: 22,
        experience: 230
    },
    {
        level: 23,
        experience: 240
    },
    {
        level: 24,
        experience: 250
    },
    {
        level: 25,
        experience: 260
    },
    {
        level: 26,
        experience: 270
    },
    {
        level: 27,
        experience: 280
    },
    {
        level: 28,
        experience: 290
    },
    {
        level: 29,
        experience: 300
    },
    {
        level: 30,
        experience: 310
    },
    {
        level: 31,
        experience: 320
    },
    {
        level: 32,
        experience: 330
    },
    {
        level: 33,
        experience: 340
    },
    {
        level: 34,
        experience: 350
    },
    {
        level: 35,
        experience: 360
    },
    {
        level: 36,
        experience: 370
    },
    {
        level: 37,
        experience: 380
    },
    {
        level: 38,
        experience: 390
    },
    {
        level: 39,
        experience: 400
    },
    {
        level: 40,
        experience: 410
    },
    {
        level: 41,
        experience: 420
    },
    {
        level: 42,
        experience: 430
    },
    {
        level: 43,
        experience: 440
    },
    {
        level: 44,
        experience: 450
    },
    {
        level: 45,
        experience: 460
    },
    {
        level: 46,
        experience: 470
    },
    {
        level: 47,
        experience: 480
    },
    {
        level: 48,
        experience: 490
    },
    {
        level: 49,
        experience: 500
    },
    {
        level: 50,
        experience: 510
    }
];

const calculateLevel = async (userId) => {
    const user = await User.findById(userId);
    let experience = user.experience;
    let level = user.level;

    for (let i = 0; i < levelsRequirements.length; i++) {
        const requirement = levelsRequirements[i];

        if (experience >= requirement.experience) {
            level = requirement.level;
            experience -= requirement.experience;
        } else {
            break
        }
    }

    user.level = level;
    user.experience = experience;

    await user.save();

    return level;
};

module.exports = calculateLevel;
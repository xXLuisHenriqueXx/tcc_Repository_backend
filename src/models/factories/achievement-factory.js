const { Factory } = require("fishery");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const achievementFactory = Factory.define(() => {
    return {
        _id: new mongoose.Types.ObjectId(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
});

module.exports = achievementFactory;
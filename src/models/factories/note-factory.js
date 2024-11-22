const { Factory } = require("fishery");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const noteFactory = Factory.define(() => {
    return {
        _id: new mongoose.Types.ObjectId(),
        title: faker.lorem.sentence(2),
        content: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
});

module.exports = noteFactory;
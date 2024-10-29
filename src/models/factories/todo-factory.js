const { Factory } = require("fishery");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const todoFactory = Factory.define(() => ({
    _id: new mongoose.Types.ObjectId(),
    title: faker.lorem.words(),
    tasks: [
        {
            _id: new mongoose.Types.ObjectId(),
            title: faker.lorem.words(),
            done: false
        },
        {
            _id: new mongoose.Types.ObjectId(),
            title: faker.lorem.words(),
            done: false
        }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
}));

module.exports = todoFactory;
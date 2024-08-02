const { Factory } = require("fishery");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const taskFactory = Factory.define(() => ({
    _id: new mongoose.Types.ObjectId(),
    title: faker.lorem.words(),
    done: false
}));

module.exports = taskFactory;
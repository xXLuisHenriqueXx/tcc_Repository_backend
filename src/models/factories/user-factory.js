const { Factory } = require("fishery");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const userFactory = Factory.define(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const password = faker.internet.password(8);

    return {
        _id: new mongoose.Types.ObjectId(),
        name: firstName + " " + lastName,
        email: faker.internet.email(firstName),
        password: password,
        confirmPassword: password,
        createdAt: new Date(),
        updatedAt: new Date()
    }
});

module.exports = userFactory;
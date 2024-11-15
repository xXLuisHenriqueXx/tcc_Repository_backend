const express = require("express");
const helmet = require("helmet");
const router = require("./router");

const app = express();

app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "example.com"],
        styleSrc: ["'self'", "example.com"],
        imgSrc: ["'self'", "example.com"],
        connectSrc: ["'self'", "api.example.com"],
        fontSrc: ["'self'", "fonts.example.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
}));

app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
}));

app.use(express.json());
app.use(router);

module.exports = app;
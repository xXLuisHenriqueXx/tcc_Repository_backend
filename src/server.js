const http = require('node:http');
const app = require('./app');

const server = http.createServer(app);

module.exports = server;
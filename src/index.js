require('dotenv').config()

const database = require('./config/database');
const server = require('./server');

const PORT = process.env.PORT || 3000;

database.connect();

server.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
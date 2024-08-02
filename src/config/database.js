require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const mongoose = require("mongoose");

mongoose.set("strictQuery", false); // Comando que desativa o modo estrito do mongoose

function connect() {
    mongoose.connect(process.env.DATABASE_URL);
    return mongoose.connection; // Retorna a conexão com o banco de dados
}

module.exports = { connect }; // Exporta a função connect
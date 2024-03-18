const mongoose = require("mongoose");

// Importe a função connectDB do seu db.js
const connectDB = require('../server/config/db');

// Use a função connectDB para conectar-se ao banco de dados
connectDB().then(() => {
    console.log("Database connected Successfully");
}).catch(() => {
    console.log("Database cannot be connected");
});

// Crie um esquema e modele a coleção
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Defina o modelo da coleção
const collection = mongoose.model("users", LoginSchema);

module.exports = collection;
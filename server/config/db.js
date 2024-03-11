const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.iumziex.mongodb.net/test`);
        console.log(`Database Conectada: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://interactiveautoma:sNW4EJ7tURGYYftn@cluster0.iumziex.mongodb.net/test`);
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        throw new Error('Unable to connect to the database.');
    }
}

module.exports = connectDB;
require('dotenv').config();

const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('express-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

// Config JSON response
app.use(express.json())

// Models
const User = require('./server/models/User');
const { restart } = require('nodemon');

// Connect to Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Static Files
app.use(express.static('public'));

// Express Session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        }
    })
);

// Flash Messages
app.use(flash());

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Signup Route
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.send("User already exists. Please choose a different username.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
        
        res.send("User registered successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user.");
    }
});

// Login Route
app.get("/", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.send("Username not found.");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            return res.render("home", { user }); // Renderizar a página home com o usuário
        } else {
            return res.send("Wrong password.");
        }
    } catch (error) {
        console.error(error);
        res.send("An error occurred during login.");
    }
});

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
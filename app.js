require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
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

// Connect to Database
connectDB();

// Register User
app.post('/auth/register', async(req, res) => {

    const {name, email, password, confirmpassword} = req.body

    // validations
    if(!name) {
        return res.status(422).json({msg: 'O nome é obrigatório' })
    }

    if(!email) {
        return res.status(422).json({msg: 'O email é obrigatório' })
    }

    if(!password) {
        return res.status(422).json({msg: 'A senha é obrigatória' })
    }

})

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
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/customer'))

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`App aplicado na porta ${port}`)
});
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
const { restart } = require('nodemon');

// Connect to Database
connectDB();

// Login User
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body

    //validations
    if (!email) {
        return res.status(422).json({msg: 'O email é obrigatório!'})
    }

    if (!password) {
        return res.status(422).json({msg: 'A senha é obrigatória!'})
    }

    // check if user exists
    const user = await User.findOne({email: email})

    if (!user) {
        return res.status(404).json({msg: 'Usuário não encontrado!'})
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({msg: 'Senha inválida!'})
    }

})

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

    if(password !== confirmpassword) {
        return res.status(422).json({msg: 'As senhas não conferem'})
    }

    // check if user exists
    const userExists = await User.findOne({ email: email })

    if (userExists) {
        return res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' })
    }

    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    // create user
    const user = new User({
        name,
        email,
        password: passwordHash,
    })

    try {
        await user.save()

        res.status(201).json({msg:'Usuário criado com sucesso!'})
    } catch (error) {
       console.log(error)
       res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'}) 
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
const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');

const app = express();

// use EJS as the view engine
app.set('view engine', 'ejs');

app.get('/login', (req, res) => {
    res.render("login");
});
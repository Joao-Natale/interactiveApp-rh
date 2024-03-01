const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/*
    * GET /
    * Homepage
*/

exports.homepage = async (req, res) => {

    const locals = {
            title: 'InteractiveApp-RH',
            description: 'Sistema de gerenciamento de funcionários'
        }
    res.render('index', locals );

}


/*
    * GET /
    * New Customer Form
*/
exports.addCustomer = async (req, res) => {

    const locals = {
            title: 'Adicionar Novo Funcionário',
            description: 'Sistema de Gerenciamento de Funcionários'
        }
    res.render('customer/add', locals );

}


/*
    * POST /
    * Create Customer Form
*/
exports.postCustomer = async (req, res) => {
    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email
    });

    try {
        await Customer.create(newCustomer);
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
    
}

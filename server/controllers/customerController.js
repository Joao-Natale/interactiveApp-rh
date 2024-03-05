// customerController.js

const Customer = require('../models/Customer');
const mongoose = require('mongoose');

exports.homepage = async (req, res) => {
    const messages = req.flash('info');
    const locals = {
            title: 'InteractiveApp-RH',
            description: 'Sistema de gerenciamento de funcionários'
        };

        let perPage = 10;
        let page = req.query.page || 1;

        try {
            const customers = await Customer.aggregate([ { $sort: { updatedAt: -1 } } ])
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec();
                const count = await Customer.countDocuments();

            res.render('index', {
                locals,
                customers,
                current: page,
                pages: Math.ceil(count / perPage),
                messages
            });


        } catch (error) {
            console.log(error);
        }

}

/* exports.homepage = async (req, res) => {
    const messages = req.flash('info');
    const locals = {
            title: 'InteractiveApp-RH',
            description: 'Sistema de gerenciamento de funcionários'
        };

        try {
            const customers = await Customer.find({}).limit(100);
            res.render('index', { locals, messages, customers } );
        } catch (error) {
            console.log(error);
        }

} */

 exports.about = async (req, res) => {
    const locals = {
            title: 'InteractiveApp About',
            description: 'Sistema de gerenciamento de funcionários'
        };

        try {
            res.render('about', locals);
        } catch (error) {
            console.log(error);
        }

}

exports.addCustomer = async (req, res) => {
    const locals = {
            title: 'Adicionar Novo Funcionário',
            description: 'Sistema de Gerenciamento de Funcionários'
        };
    res.render('customer/add', locals );
}

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
        req.flash('info', 'Novo funcionário foi adicionado.')
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};

exports.viewCustomer = async (req, res) => {

    try {
        const customer = await Customer.findOne({ _id: req.params.id })

        const locals = {
            title: 'Visualizar dados do Funcionário',
            description: 'Sistema de Gerenciamento de Funcionários'
        };

        res.render('customer/view', {
            locals,
            customer
        })
    } catch (error) {
        console.log(error);
    }
}



exports.editCustomer = async (req, res) => {

    try {
        const customer = await Customer.findOne({ _id: req.params.id })

        const locals = {
            title: 'Editar dados do Funcionário',
            description: 'Sistema de Gerenciamento de Funcionários'
        };

        res.render('customer/edit', {
            locals,
            customer
        })
    } catch (error) {
        console.log(error);
    }
}



exports.editPostCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndUpdate((req.params.id),{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            updatedAt: Date.now()
        });
        res.redirect(`/edit/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
}



exports.deleteCustomer = async (req, res) => {
    try {
       await Customer.deleteOne({ _id: req.params.id });
       res.redirect("/"); 
    } catch (error) {
       console.log(error); 
    }
}


exports.searchCustomers = async (req, res) => {

    const locals = {
        title: 'Busca do registro de funcionário',
        description: 'Sistema de Gerenciamento de Funcionários',
    }

    try {
        let searchTerm= req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const customers = await Customer.find({
            $or: [
                { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
                { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
            ]
        });

        res.render("search", {
            customers,
            locals
        })

    } catch (error) {
        console.log(error);
    }
}
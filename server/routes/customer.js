const express = require('express');
const router = express.Router();
const costumerController = require('../controllers/customerController');

/*
    Costumer Routes
*/
router.get('/', costumerController.homepage);
router.get('/about', costumerController.about);

router.get('/add', costumerController.addCustomer);
router.post('/add', costumerController.postCustomer);

router.get('/view/:id', costumerController.viewCustomer);

router.get('/edit/:id', costumerController.editCustomer);
router.put('/edit/:id', costumerController.editPostCustomer);
router.delete('/edit/:id', costumerController.deleteCustomer);

router.post('/search', costumerController.searchCustomers);

module.exports = router;

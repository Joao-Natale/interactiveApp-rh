const express = require('express');
const router = express.Router();
const costumerController = require('../controllers/customerController');

/*
    Costumer Routes
*/
router.get('/', costumerController.homepage);

router.get('/add', costumerController.addCustomer);
router.post('/add', costumerController.postCustomer);

router.get('/view/:id', costumerController.viewCustomer);

module.exports = router;

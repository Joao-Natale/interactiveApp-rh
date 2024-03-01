const express = require('express');
const router = express.Router();
const costumerController = require('../controllers/costumerController');

/*
    Costumer Routes
*/
router.get('/', costumerController.homepage);

router.get('/add', costumerController.addCustomer);
router.post('/add', costumerController.postCustomer);



module.exports = router;

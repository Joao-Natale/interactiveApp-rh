const express = require('express');
const router = express.Router();
const costumerController = require('../controllers/costumerController');

/*
    Costumer Routes
*/
router.get('/', costumerController.homepage);



module.exports = router;

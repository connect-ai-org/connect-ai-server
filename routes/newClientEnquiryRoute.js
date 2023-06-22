const express = require('express');

const newClientEnquiryController = require('../controllers/newClientEnquiryController');

const router = express.Router();

router.route('/').post(newClientEnquiryController.createNewClientEnquiry);

module.exports = router;

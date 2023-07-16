const express = require('express');

const contactController = require('../../controllers/contacts/contactController');

const router = express.Router();

router.route('/').post(contactController.createContact);

module.exports = router;

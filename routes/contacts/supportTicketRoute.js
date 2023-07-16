const express = require('express');

const supportTicketController = require('../../controllers/contacts/supportTicketController');

const router = express.Router();

router.route('/').post(supportTicketController.createContact);

module.exports = router;

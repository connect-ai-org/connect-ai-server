const Contact = require('../../models/contacts/contactModel');
const {
  sendContactEmailToCustomer,
  sendContactEmailToAdmin,
} = require('../emailController');

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    sendContactEmailToCustomer(req.body);
    sendContactEmailToAdmin(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        contact: contact,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

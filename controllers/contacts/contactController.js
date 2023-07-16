const Contact = require('../../models/contacts/contactModel');
const { sendContactEmail } = require('../emailController');

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    sendContactEmail(req.body);

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

const NewClientEnquiry = require('../../models/contacts/newClientEnquiryModel');
const {
  sendNewClientEnquiryEmailToCustomer,
  sendNewClientEnquiryEmailToAdmin,
} = require('../emailController');

exports.createNewClientEnquiry = async (req, res) => {
  try {
    const newClientEnquiry = await NewClientEnquiry.create(req.body);
    sendNewClientEnquiryEmailToCustomer(req.body);
    sendNewClientEnquiryEmailToAdmin(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newClientEnquiry: newClientEnquiry,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

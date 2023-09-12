const SupportTicket = require('../../models/contacts/supportTicketModel');
const {
  sendSupportTicketEmailToCustomer,
  sendSupportTicketEmailToAdmin,
} = require('../emailController');

exports.createSupportTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.create(req.body);
    sendSupportTicketEmailToCustomer(req.body);
    sendSupportTicketEmailToAdmin(req.body, req.files);

    res.status(201).json({
      status: 'success',
      data: {
        ticket: ticket,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

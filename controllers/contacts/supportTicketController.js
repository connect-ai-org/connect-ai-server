const SupportTicket = require('../../models/contacts/supportTicketModel');
const { sendSupportTicketEmail } = require('../emailController');

exports.createSupportTicket = async (req, res) => {
  try {
    const ticket = await SupportTicket.create(req.body);
    sendSupportTicketEmail(req.body);

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

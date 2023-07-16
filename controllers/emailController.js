/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { getEmail } = require('../utils/email');

const sendEmail = (message) => {
  const [EMAIL, PASSWORD] = getEmail();
  const config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(config);
  transporter
    .sendMail(message)
    .then(() => {
      console.log('Send Email Successfully...!');
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.sendNewClientEnquiryEmail = (user) => {
  const [EMAIL] = getEmail();

  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Connect AI',
      link: 'https://dev-connect-ai.web.app/contact',
    },
  });

  const response = {
    body: {
      name: user.firstName,
      intro:
        'Thank you for reaching out! We received your email and will get back to you shortly.',
      table: {
        data: [
          {
            name: [user.firstName, user.lastName].join(' '),
            business: user.businessName,
            email: user.email,
          },
        ],
      },
      outro: '',
    },
  };
  const mail = MailGenerator.generate(response);
  const message = {
    from: EMAIL,
    to: user.email,
    subject: 'New Client Enquiry',
    html: mail,
  };

  sendEmail(message);
};

exports.sendContactEmail = (info) => {
  const [EMAIL] = getEmail();

  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Connect AI',
      link: 'https://dev-connect-ai.web.app/contact',
    },
  });

  const response = {
    body: {
      name: info.firstName,
      intro:
        'Thank you for reaching out! We received your email and will get back to you shortly.',
      table: {
        data: [
          {
            name: [info.firstName, info.lastName].join(' '),
            email: info.email,
          },
        ],
      },
      outro: '',
    },
  };
  const mail = MailGenerator.generate(response);
  const message = {
    from: EMAIL,
    to: info.email,
    subject: 'Contact',
    html: mail,
  };

  sendEmail(message);
};

/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

const { getEmail } = require('../utils/email');

const sendEmail = (message) => {
  const [EMAIL, PASSWORD] = getEmail();
  const config = {
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: 'SSLv3',
    },
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
        'Thank you for reaching out! We have received your email and we will get back to you within three business days.',
      outro: [
        'If there is anything urgent or you prefer to talk on the phone, please call us on 0414001427.',
        'We look forward to chatting soon!',
      ],
      signature: 'Warm regards',
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
        'Thank you for reaching out! We have received your email and we will get back to you within three business days.',
      outro: [
        'If there is anything urgent or you prefer to talk on the phone, please call us on 0414001427.',
        'We look forward to chatting soon!',
      ],
      signature: 'Warm regards',
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

exports.sendSupportTicketEmail = (info) => {
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
        'Thank you for reaching out! We have received your email and we will get back to you within three business days.',
      outro: [
        'If there is anything urgent or you prefer to talk on the phone, please call us on 0414001427.',
        'We look forward to chatting soon!',
      ],
      signature: 'Warm regards',
    },
  };
  const mail = MailGenerator.generate(response);
  const message = {
    from: EMAIL,
    to: info.email,
    subject: 'Support Ticket',
    html: mail,
    attachments: info.attachments.map((file) => ({
      filename: file.firstName,
      path: file.fileUrl,
    })),
  };

  sendEmail(message);
};

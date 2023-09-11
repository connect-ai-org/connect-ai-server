/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const fs = require('fs');

const { getEmail, getAdminEmail } = require('../utils/email');

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
      if (message.attachments) {
        message.attachments.forEach((file) => {
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error(`Cannot remove temporary file: ${file.filename}`);
            } else {
              console.info(`Remove file ${file.filename} successfully`);
            }
          });
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.sendNewClientEnquiryEmailToCustomer = (user) => {
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

exports.sendContactEmailToCustomer = (info) => {
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

exports.sendSupportTicketEmailToCustomer = (info) => {
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
  };

  sendEmail(message);
};

// knownBy: formValue.knownBy || '',
// hasAlreadyWorkedWithMarketingAgency: formValue.hasAlreadyWorkedWithMarketingAgency ? true : false,

// How did you hear about us:...
// Have you worked with a marketing agency before:....

exports.sendNewClientEnquiryEmailToAdmin = (info) => {
  const [EMAIL] = getEmail();
  const ADMIN_EMAIL_ADDRESS = getAdminEmail();

  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Connect AI',
      link: 'https://dev-connect-ai.web.app/contact',
    },
  });

  const response = {
    body: {
      greeting: false,
      signature: false,
      name: 'ConnectAI',
      intro: 'You have received a new client enquiry.',
      outro: [
        `Business Name: ${info.businessName}`,
        `First Name: ${info.firstName}`,
        `Last Name: ${info.lastName}`,
        `Job Title / Position / Role in the business:: ${info.jobTitle}`,
        `Are you the business owner: ${info.isBusinessOwner ? 'Yes' : 'No'}`,
        `Email Address: ${info.email}`,
        `Phone: ${info.phone}`,
        `Website: ${info.website}`,
        `Industry: ${info.industry}`,
        `Do you have a current marketing plan: ${
          info.hasMarketingPlan ? 'Yes' : 'No'
        }`,
        `What marketing help do you need: ${info.description}`,
        `How did you hear about us: ${info.knownBy}`,
        `Have you worked with a marketing agency before: ${
          info.hasAlreadyWorkedWithMarketingAgency ? 'Yes' : 'No'
        }`,
      ],
    },
  };
  const mail = MailGenerator.generate(response);
  const message = {
    from: EMAIL,
    to: ADMIN_EMAIL_ADDRESS,
    subject: 'New Client Enquiry',
    html: mail,
  };

  sendEmail(message);
};

exports.sendContactEmailToAdmin = (info) => {
  const [EMAIL] = getEmail();
  const ADMIN_EMAIL_ADDRESS = getAdminEmail();

  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Connect AI',
      link: 'https://dev-connect-ai.web.app/contact',
    },
  });

  const response = {
    body: {
      greeting: false,
      signature: false,
      name: 'ConnectAI',
      intro: 'You have received a contact.',
      outro: [
        `First Name: ${info.firstName}`,
        `Last Name: ${info.lastName}`,
        `Email: ${info.email}`,
        `Phone: ${info.phone}`,
        `Company: ${info.company}`,
        `Message: ${info.message}`,
      ],
    },
  };
  const mail = MailGenerator.generate(response);
  const message = {
    from: EMAIL,
    to: ADMIN_EMAIL_ADDRESS,
    subject: 'Contact Our Team',
    html: mail,
  };

  sendEmail(message);
};

exports.sendSupportTicketEmailToAdmin = (info, files) => {
  const [EMAIL] = getEmail();
  const ADMIN_EMAIL_ADDRESS = getAdminEmail();

  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Connect AI',
      link: 'https://dev-connect-ai.web.app/contact',
    },
  });

  const response = {
    body: {
      greeting: false,
      signature: false,
      name: 'ConnectAI',
      intro: 'You have received a new support ticket.',
      outro: [
        `First Name: ${info.firstName}`,
        `Last Name: ${info.lastName}`,
        `Email: ${info.email}`,
        `Phone: ${info.phone}`,
        `Message: ${info.ticket}`,
      ],
    },
  };
  const mail = MailGenerator.generate(response);
  const message = {
    from: EMAIL,
    to: ADMIN_EMAIL_ADDRESS,
    subject: 'Support Ticket',
    html: mail,
    attachments: files.map((file) => ({
      filename: file.filename,
      path: file.path,
    })),
  };

  sendEmail(message);
};

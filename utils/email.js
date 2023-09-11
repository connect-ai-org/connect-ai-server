exports.getEmail = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return [process.env.EMAIL_ADDRESS_DEV, process.env.EMAIL_PASSWORD_DEV];
    case 'production':
      return [process.env.EMAIL_ADDRESS_PROD, process.env.EMAIL_PASSWORD_PROD];
    case 'local':
      return [process.env.EMAIL_ADDRESS_DEV, process.env.EMAIL_PASSWORD_DEV];
    default:
      return [process.env.EMAIL_ADDRESS_DEV, process.env.EMAIL_PASSWORD_DEV];
  }
};

exports.getAdminEmail = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return process.env.ADMIN_EMAIL_ADDRESS_DEV;
    case 'production':
      return process.env.ADMIN_EMAIL_ADDRESS_PROD;
    case 'local':
      return process.env.ADMIN_EMAIL_ADDRESS_DEV;
    default:
      return process.env.ADMIN_EMAIL_ADDRESS_DEV;
  }
};

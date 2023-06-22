const mongoose = require('mongoose');

const newClientEnquirySchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: [true, 'Business Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

newClientEnquirySchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  // console.log(docs);
  next();
});

const NewClientEnquiry = mongoose.model(
  'NewClientEnquiry',
  newClientEnquirySchema
);

module.exports = NewClientEnquiry;

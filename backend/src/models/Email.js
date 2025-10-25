const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  messageId: { type: String, unique: true, required: true },
  account: { type: String, required: true, index: true },
  from: { type: String, required: true },
  to: [String],
  subject: String,
  body: String,
  folder: { type: String, required: true, index: true },
  receivedAt: { type: Date, default: Date.now, index: true },
  category: {
    type: String,
    enum: ['Interested', 'Meeting Booked', 'Not Interested', 'Spam', 'Out of Office', 'None'],
    default: 'None',
  },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Email', EmailSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailSchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [String],
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: Date,
    type: String,
    sendDate: Date,
    count: { type: Number, default: 0 }
    // sent: Boolean
});

mongoose.model('emails', emailSchema);
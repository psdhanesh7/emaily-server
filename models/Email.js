const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailSchema = new Schema({
    from: { type: String, required: true},
    subject: { type: String, required: true},
    body: { type: String, required: true},
    recipients: { type: [String], required: true },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: Date,
    type: String,
    sendDate: Date,
    count: { type: Number, default: 0 },
    schedule: Object
    // sent: Boolean
});

mongoose.model('emails', emailSchema);
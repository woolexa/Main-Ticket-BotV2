const mongoose = require('mongoose');

const WoolexaTheGuardianSchema = new mongoose.Schema({
    kullanıcıid: { type: String, required: true },
    date: { type: Date, default: Date.now },
    odanınismi: { type: String },
});

const WoolexaTheGuardian = mongoose.model('WoolexaTheGuardian', WoolexaTheGuardianSchema);

module.exports = WoolexaTheGuardian;

const mongoose = require("mongoose");

const wedoInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    healthGaol: {
        type: String,
        required: true,
        enum: ['fat loss', 'muscle gain', 'post pregnancy fat loss', 'gain energy', 'improve skin']
    },
    age: {
        type: Number,
        required: true
    },
    instaId: {
        type: String,
        required: true
    },
    useSupplementsBefore: {
        type: String,
        required: true,
        enum: ['yes', 'no']
    },
    ifYesWhich: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const WedoInfo = mongoose.model('WedoInfo', wedoInfoSchema);

module.exports = WedoInfo;


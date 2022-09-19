const mongoose = require('mongoose');
const sender = require('./sender');

const parcelSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'Sender'
    },
    weight: {
        type: Number,
        required: true,
        validate: {
            validator: function (weight) {
                return weight > 0;
            },
            message: 'Weight must be greater than 0'
        }
    },
    address: {
        type: String,
        required: true,
        validate: {
            validator: function (address) {
                return address.length >=3;
            },
            message: 'Address name must be greater than 3 characters'
        }
    },
    fragile: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Parcel', parcelSchema);
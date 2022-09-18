const mongoose = require('mongoose');
const parcel = require('./parcel');

const senderSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (name) {
                return name.length >=3;
            },
            message: 'Name must be greater than 3 characters'
        }
    },
    parcels: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Parcel'
    }]
});

module.exports = mongoose.model('Sender', senderSchema);
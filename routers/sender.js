const mongoose = require('mongoose');

const Sender = require('../models/sender');
const Parcel = require('../models/parcel');

module.exports = {
    getAllSenders: function (req, res) {
        Sender.find({}, function (err, senders) {
            if (err) {
                return res.json(err);
            } else {
                res.json(senders)
            }
        });
    },

    getSenderName: function (req, res) {
        Sender.find({name: req.params.name})
            .populate('parcels')
            .exec(function (err, sender) {
                if (err) return res.status(400).json(err); 
                if (!sender) return res.status(404).json();
                res.json(sender);
        });
    },

    newSender: function (req, res) {
        let newSenderDetails = req.body;
        let sender = new Sender(newSenderDetails);
        sender.save(function (err) {
            console.log('Done');
            res.json(sender);
        });
    },

    deleteSender: function (req, res) {
        Sender.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    updateSenderName: function (req, res) {
        Sender.findByIdAndUpdate(req.body.id, {name: req.body.name}, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();
    
            res.json(sender);
        });
    },
};
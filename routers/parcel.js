const mongoose = require('mongoose');

const Sender = require('../models/sender');
const Parcel = require('../models/parcel');

module.exports = {
    getParcelsByAddress: function (req, res) {
        let address = req.query.address;
        Parcel.find({address: address}, function (err, parcels) {
            if (err) {
                return res.json(err);
            } else {
                res.json(parcels);
            }
        });
    },

    addParcel: function (req, res) {
        let newParcelDetails = req.body.parcel;
        newParcelDetails.sender = req.body.senderId;
    
        let parcel = new Parcel(newParcelDetails);
        parcel.save(function (err, parcel) {
            console.log('Done');
            Sender.findOne({_id: req.body.senderId}, function (err, sender) {
                if (err) return res.status(400).json(err);
    
                sender.parcels.push(parcel._id);
                sender.save();

                res.json(sender);
            })
        });
    },    

    updateParcelAddress: function (req, res) {
        Parcel.findByIdAndUpdate(req.query.id, {address: req.body.address}, function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();
    
            res.json(parcel);
        });
    },

    updateParcelIncCost: function (req, res) {
        Parcel.findByIdAndUpdate(req.body.id, {$inc: {cost: 10}}, function (err, parcel) {
            if (err) return res.status(400).json(err);
            if (!parcel) return res.status(404).json();
    
            res.json(parcel);
        });
    },

    deleteParcel: function (req, res) {
        let type = req.body.type;

        if (type === "weight") {
            let weight = req.body.weight;
            Parcel.deleteMany({weight: weight}, function (err) {
                if (err) return res.status(400).json(err);
                res.json();
            })
        } else if (type === "cost") {
            let cost = req.body.cost;
            Parcel.deleteMany({cost: cost}, function (err) {
                if (err) return res.status(400).json(err);
                res.json();
            })
        } else {
            let id = req.body.id;
            Parcel.findOneAndRemove({ _id: id }, function (err) {
                if (err) return res.status(400).json(err);
                res.json();
            });
        }
    }
};
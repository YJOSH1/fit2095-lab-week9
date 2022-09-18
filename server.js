const express = require('express');
const mongoose = require('mongoose');

const parcel = require('./routers/parcel');
const sender = require('./routers/sender');

const app = express();

let path = require('path');

app.listen(8080);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "dist/fit2095-lab-week9")));

mongoose.connect('mongodb://localhost:27017/poms', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Endpoints
//Parcel
app.get('/parcel', parcel.getParcelsByAddress);
app.put('/parcel/address', parcel.updateParcelAddress);
app.put('/parcel/cost', parcel.updateParcelIncCost);
app.put('/sender/parcel', parcel.addParcel);
app.delete('/parcel', parcel.deleteParcel);
app.get('/parcels', parcel.getAllParcels);


//Sender
app.post('/sender', sender.newSender);
app.get('/sender/:name', sender.getSenderName);
app.delete('/sender', sender.deleteSender)
app.put('/sender', sender.updateSenderName);
app.get('/senders', sender.getAllSenders);

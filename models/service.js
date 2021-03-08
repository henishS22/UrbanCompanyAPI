const mongoose = require('mongoose');
const db = require('../connections/dbMaster');
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description required'],
        trim: true
    },
    serviceTime: {
        type: String,
        trim: true,
        required: [true, 'Time required']
    },
    isAvailable: {
        type: Boolean,
        default: true,
        trim: true
    },
    categoryID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Categories',
        required: [true, 'Category ID required'],
    },
    vendorID: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        trim: true
    }]
});

const Service = db.model('service', serviceSchema);
module.exports = Service;
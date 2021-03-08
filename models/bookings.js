const mongoose = require('mongoose');
const db = require('../connections/dbMaster');
const bookingsSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: [true, 'ID required']

    },
    vendorID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: [true, 'ID required'],

    },
    serviceID: {
        type: mongoose.Schema.ObjectId,
        ref: 'service',
        required: [true, 'ID required'],

    },
    price: Number,
    qty: {
        type: Number,
        default: 1
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price required']
    },
    bookingDate: {
        type: Date,
        required: [true, 'Booking date required']
    },
    bookingTime: {
        type: String,
        required: [true, 'Booking time required']
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'cancelled', 'inprogress', 'rejected', 'accepted'],
        default: 'pending'
    },
    isCanceledBy: {
        type: String,
        enum: ['customer', 'vendor']
    }
});

const Bookings = db.model('Bookings', bookingsSchema);
module.exports = Bookings;
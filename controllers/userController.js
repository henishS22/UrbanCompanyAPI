const User = require('../models/user');
const Category = require('../models/category');
const Service = require('../models/service');
const Booking = require('../models/bookings');
const appError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const sendEmail = require('../utils/email');
var createError = require('http-errors');
const logger = require('../middlewares/logger');

exports.register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        if (user.role === 'vendor') {
            for (let i of user.services) {
                await Service.updateOne({ name: i }, { $push: { vendorID: mongoose.Types.ObjectId(user._id) } }, {
                    runValidators: false
                })
            }
        }
        res.status(200).json({
            message: 'User registered',
            data: user
        });
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
};

exports.login = async (req, res, next) => {
    try {
        
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.send('This email is not registered, please register First');
        }
        const match = await user.correctPassword(password, user.password);
        if (!match) {
            res.send('Incorrect Password, Try Again !');
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const user1 = await User.findOneAndUpdate({ email: email }, { userToken: token, tokenExpiresIn: Date.now() });
        res.status(201).json({
            status: 'success',
            message: "You are logged In",
            token,
            role: user1.role
        });


    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e.message
        })
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        if (req.user.role === 'admin') {
            const filter = req.param('user');

            if (filter) {
                const allUsers = await User.find({ role: filter });
                res.status(200).json({
                    data: allUsers
                })
            } else {
                if (userEmail) {
                    const getUser = await User.findOne({ email: userEmail });
                    res.status(200).json({
                        data: getUser
                    })
                } else {
                    const allUsers = await User.find({ role: { $ne: 'admin' } });
                    res.status(200).json({
                        data: allUsers
                    })
                }
            }
        } else {
            res.status(401).json({
                message: 'You Are not Admin. Not accessible for this route'
            })
        }
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
}

exports.getInfo = async (req, res, next) => {
    try {
        res.status(200).json({
            data: req.user
        })
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
}

exports.updateInfo = async (req, res, next) => {
    try {
        const notAllowed = ['isActive', 'createdAt', 'updatedAt', 'userToken'];
        for (let i of Object.keys(req.body)) {
            if (notAllowed.includes(i)) {
                delete req.body[i]
            }
        }
        req.body.updatedAt = Date.now();
        const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body);
        if (req.user.role === 'vendor') {
            if (req.user.services) {
                for (let i of req.user.services) {
                    await Service.updateOne({ name: i }, { $pull: { vendorID: mongoose.Types.ObjectId(req.user._id) } }, {
                        runValidators: false
                    })
                }

                for (let i of req.user.services) {
                    await Service.updateOne({ name: i }, { $push: { vendorID: mongoose.Types.ObjectId(req.user._id) } }, {
                        runValidators: false
                    })
                }
            }
        }

        res.status(201).json({
            message: "Details Updated",
            data: updatedUser
        })

    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e.message
        })
    }
}

exports.deleteMe = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            const userEmail = req.body.email;
            const getUser = await User.findOne({ email: userEmail });
            if (getUser.role === 'vendor') {
                for (let i of getUser.services) {
                    await Service.updateOne({ name: i }, { $pull: { vendorID: mongoose.Types.ObjectId(getUser._id) } }, {
                        runValidators: false
                    })
                }
            }
            await User.deleteOne({ email: userEmail });
            res.status(201).json({
                message: 'User deleted',
                data: getUser
            })
        } else {
            await User.deleteOne({ _id: req.user._id });
            if (req.user.role === 'vendor') {
                for (let i of req.user.services) {
                    await Service.updateOne({ name: i }, { $pull: { vendorID: mongoose.Types.ObjectId(user._id) } }, {
                        runValidators: false
                    })
                }
            } else {
                await User.deleteOne({ _id: req.user._id });
            }
            res.status(201).json({
                message: 'User deleted',
                data: req.user
            })
        }
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e.message
        })
    }
}

exports.book = async (req, res, next) => {
    try {
        const service = await Service.findOne({ _id: req.body.serviceID });
        if (!service) {
            res.send('No such Service available');
        }
        const total = req.body.qty * service.price;
        req.body.userID = req.user._id;
        req.body.price = service.price;
        req.body.totalPrice = total

        const booking = await Booking.create(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Service Booked',
            invoice: booking
        })
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        const filter = req.param('id');
        const booking = await Booking.findOne({ _id: filter });
        let updatedBooking;
        if (booking.bookingStatus === 'pending') {
            if (req.body.qty) {
                total = booking.price * req.body.qty;
                req.body.totalPrice = total;
                updatedBooking = await Booking.findOneAndupdate({ _id: filter }, req.body);
            } else {
                updatedBooking = await Booking.updateOne({ _id: filter }, req.body);
            }
            res.status(201).json({
                message: "Booking Updated",
                data: updatedBooking
            })
        } else {
            res.send('Booking is Accepted by Vendor , Not able to update');
        }
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e.message
        })
    }
}

exports.cancel = async (req, res, next) => {
    try {
        bookingId = req.body.bookingId;
        const findBooking = await Booking.findOne({ _id: bookingId });
        if (!findBooking) {
            res.send('Their is no such Booking for your Id');
        } else {
            await Booking.updateOne({ _id: findBooking }, { isCanceledBy: req.user.role, bookingStatus: "cancelled" });
            res.send("Booking Cancel");
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}

exports.showBookings = async (req, res, next) => {
    try {
        const filter = req.param['id'];
        userRole = req.user.role;
        if (userRole !== 'admin') {
            const bookings = await Booking.find({ userID: req.user._id }).populate({
                path: 'vendorID',
                select: 'name'
            }).populate({
                path: 'serviceID',
                select: 'name'
            });
            res.status(200).json({
                total: bookings.length,
                data: bookings
            })
        } else {
            if (filter) {
                const bookings = await Booking.find({ userID: filter }).populate({
                    path: 'Bookings'
                });;
                res.status(200).json({
                    total: bookings.length,
                    data: bookings
                })
            } else {
                const bookings = await Booking.find();
                res.status(200).json({
                    total: bookings.length,
                    data: bookings
                })
            }
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
}
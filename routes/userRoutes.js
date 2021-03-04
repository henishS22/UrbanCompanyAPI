const express = require('express');
const {register, login, getAllUsers, getInfo, updateInfo, deleteMe, book, updateBook, cancel, showBookings} = require('../controllers/userController');
const {loggedIn, protect, isAdmin} = require('../middlewares/auth');
const router = new express.Router();

router.post('/register', register);
router.put('/login', login);

router.get('/all-users/:user?',loggedIn,protect,isAdmin, getAllUsers);
router.get('/info', loggedIn, protect, getInfo);

router.put('/update',loggedIn,protect, updateInfo);
router.delete('/delete',loggedIn,protect, deleteMe);

router.post('/book', loggedIn,protect, book);
router.put('/update-booking',loggedIn,protect, updateBook);
router.put('/cancel',loggedIn,protect, cancel);
router.get('/bookings',loggedIn,protect, showBookings);

module.exports = router;
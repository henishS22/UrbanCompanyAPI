var express = require('express');
var router = express.Router();
const Category = require('../models/category');
const app = require('../app');
const Bookings = require('../models/bookings');
const Service = require('../models/service');
const User = require('../models/user');
const cons = require('consolidate');

router.get('/', function(req, res, next) {
  res.render('pages/index');
});

router.get('/profile', function(req, res, next) {
  res.render('pages/profile');
});

router.get('/admin-profile', async function (req, res, next) {
  const id2 = req.query.id;
  const data = await User.findOne({ _id: id2});
  res.render('pages/admin-dash', { category: 'undefined' ,categoryData: 'undefined', bookData: 'undefined', service:'undefined', serviceData: 'undefined', profile: data, allUser: 'undefined' });
});

router.get('/all-users', async function (req, res, next) {
  if (req.query.id) {
    
    const data = await User.find({ _id: req.query.id });
    
    
    res.render('pages/admin-dash', { category: 'undefined' ,categoryData: 'undefined', bookData: 'undefined', service:'undefined', serviceData: 'undefined', profile: 'undefined', allUser: data });
  } else if (req.query.search == 'vendors') {
    const data = await User.find({ role : 'vendor' });
    res.render('pages/admin-dash', { category: 'undefined' ,categoryData: 'undefined', bookData: 'undefined', service:'undefined', serviceData: 'undefined', profile: 'undefined', allUser: data });
  } else if (req.query.search == 'customers') {
    const data = await User.find({ role : 'customer' });
    res.render('pages/admin-dash', { category: 'undefined' ,categoryData: 'undefined', bookData: 'undefined', service:'undefined', serviceData: 'undefined', profile: 'undefined', allUser: data });
  }
  else {
    const data = await User.find({ role: { $ne: 'admin' } });
    res.render('pages/admin-dash', { category: 'undefined' ,categoryData: 'undefined', bookData: 'undefined', service:'undefined', serviceData: 'undefined', profile: 'undefined', allUser: data });
  }
});

router.get('/admin', function(req, res, next) {
  res.render('pages/admin-dash', { category: 'undefined' , categoryData: 'undefined', bookData: 'undefined', serviceData: 'undefined',service:'undefined', profile: 'undefined', allUser: 'undefined' });
});

router.get('/categories', async function (req, res, next) {
  const data = await Category.find({});
  res.render('pages/admin-dash', { category: data , categoryData: 'undefined', bookData: 'undefined', serviceData: 'undefined',service:'undefined',profile: 'undefined', allUser: 'undefined' });
});

router.get('/category-detail', async function (req, res, next) {
  const data1 = await Category.find({});
  const data = await Category.findOne({ _id: req.query.id });
  res.render('pages/admin-dash', { category: data1 ,categoryData: data, bookData: 'undefined', serviceData: 'undefined',service:'undefined',profile: 'undefined', allUser: 'undefined' });
});

router.get('/update-category', async function (req, res, next) {
  const data1 = await Category.find({});
  const data = await Category.findOne({ _id: req.query.id });
  res.render('pages/admin-dash', { category: data1 ,categoryData: data, bookData: 'undefined', serviceData: 'undefined',service:'undefined',profile: 'undefined', allUser: 'undefined' });
});

router.get('/bookings', async function (req, res, next) {
  if (req.query.status) {
    const data = await Bookings.find({ bookingStatus: req.query.status }).populate('userID vendorID serviceID');
    res.render('pages/admin-dash', { category: 'undefined' , categoryData: 'undefined', bookData: data, serviceData: 'undefined',service:'undefined',profile: 'undefined', allUser: 'undefined' });
  } else {
    const data = await Bookings.find({}).populate('userID vendorID serviceID');
    res.render('pages/admin-dash', { category: 'undefined', categoryData: 'undefined', bookData: data, serviceData: 'undefined', service: 'undefined', profile: 'undefined', allUser: 'undefined' });
  }
  
});

router.get('/services', async function (req, res, next) {
  const data = await Service.find({}).populate('vendorID');
  console.log(data);
  res.render('pages/admin-dash', { category: 'undefined' , categoryData: 'undefined', bookData: 'undefined',service:data, serviceData: 'undefined',profile: 'undefined', allUser: 'undefined' });
});

router.get('/service-detail', async function (req, res, next) {
  const data1 = await Service.find({});
  const data = await Service.findOne({ _id: req.query.id }).populate('categoryID');
  res.render('pages/admin-dash', { category: 'undefined' ,categoryData: 'undefined', bookData: 'undefined', service:data1, serviceData: data,profile: 'undefined', allUser: 'undefined'  });
});
module.exports = router;

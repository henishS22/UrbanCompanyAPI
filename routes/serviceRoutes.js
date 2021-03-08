const { loggedIn, protect, isAdmin } = require('../middlewares/auth');
const { addService, deleteService, listServices, updateService, getService, getServiceOfCategory } = require('../controllers/serviceController');

const express = require('express');
const router = express.Router();

router.post('/add-service',isAdmin, protect, addService);
router.delete('/delete-service', isAdmin, protect, deleteService);

router.get('/list-services',loggedIn,protect, listServices);
router.put('/update', isAdmin, protect,updateService);

router.get('/get-service',loggedIn, protect,getService);
router.get('/get-category-services', loggedIn,protect, getServiceOfCategory);

module.exports = router;
const express = require('express');
const router = express.Router();

const {loggedIn, protect, isAdmin} = require('../middlewares/auth');
const {addCategory, listCategories, updateCategory, getCategory, deleteCategory} = require('../controllers/categoryController');

router.post('/add-category',isAdmin,protect, addCategory);
router.get('/list-categories',loggedIn,protect, listCategories);
router.put('/update',isAdmin, protect,updateCategory);
router.get('/get-category',loggedIn,protect, getCategory);
router.delete('/delete-category',isAdmin, protect,deleteCategory);

module.exports = router;
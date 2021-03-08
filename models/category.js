const mongoose = require('mongoose');
const db = require('../connections/dbMaster');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name required'],
        trim: true
    }
});

const Category = db.model('Categories', categorySchema);
module.exports = Category;
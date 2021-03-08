const mongoose = require('mongoose');
const db = require('../connections/dbMaster');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        trim: true,
        lowercase: true,
        validator: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain "Password"');
            }
        }
    },
    address: {
        type: String,
        required: [true, 'Address required'],
        trim: true
    },
    role: {
        type: String,
        default: 'customer',
        enum: [
            'customer', 'vendor', 'admin'
        ],
        trim: true
    },
    services: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    userToken: {
        type: String,
    },
    tokenExpiresIn: {
        type: String,
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: Date
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.correctPassword = async function (password, encryptedPass) {
    return await bcrypt.compare(password, encryptedPass);
}

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

const User = db.model('Users', userSchema);
module.exports = User;

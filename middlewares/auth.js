const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
var createError = require('http-errors')

exports.protect = async (req, res, next) => {
    // if (Date.now() - req.user.tokenExpiresIn > 1000000) {
    //     res.send('You are not Logged In, Please Login !');
    // } else {
    //     next();
    // }
    next();
}

exports.loggedIn = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.send('Login First');
        createError(401, 'Please Login First');
    }
    const user = await User.findOne({ userToken: token });
    if (!user) {
        res.send('No user Found !');
    } else {
        req.user = user;
        next();
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.send('Login First');
        }
        const user = await User.findOne({ userToken: token });
        if (!user || user.role !== 'admin') {
            throw new Error();
        } else {
            next();
        }
    } catch (e) {
        res.status(401).json({ message: 'Authorization failed !' });
    }
};
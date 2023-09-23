const {User} = require('../models/user')
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Create user
router.post('/', (req, res) => {
    let user = User.create({
        email: req.body.email,
        fullName: req.body.fullname,
        passwordHash: bcrypt.hashSync(req.body.password, 10)
    })
    .then(createdUser => {
        if (!createdUser) {
            return res.status(401).json({
                success: false,
                error: 'User could not be created'
            })
        }
        return res.status(201).json(createdUser)
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            error: err
        })
    })
}) 

// List all users
router.get('/', async (req, res) => {
    return res.status(200).json({
        success: true
    })
})

module.exports = router
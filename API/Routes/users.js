const express = require('express');
// FORKLARING, VIDEO 3 - 1MIN
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../Models/user');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /users'
    });
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    user.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /users',
        createdUser: user
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if(id === 'special') {
        res.status(200).json({
            message: 'You discovered the spcial ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated user!'
    });
});

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted user!'
    });
});

module.exports = router;
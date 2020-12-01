const express = require('express');
// FORKLARING, VIDEO 3 - 1MIN
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSign = require('../Models/userSign');

router.post('/signup', (req, res, next) => {
    console.log(req.body);
        userSign.find({email: req.body.email})
        .exec()
        .then(signUser => {
            if (signUser.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                    const signUser = new userSign({
                        _id: new mongoose.Types.ObjectId(), 
                        email: req.body.email,
                        password: hash,
                        gender: req.body.gender,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        birthday: req.body.birthday,
                        //bio: req.body.bio
                        });
                        signUser
                        .save()
                        .then(result =>{
                            console.log(result);
                            res.status(201).json({
                                message: 'User created'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        })
                    }
                });
            }
        });
});

router.post('/login', (req, res, next) => {
    console.log(req.body)
    userSign.find({ email: req.body.email })
    .exec()
    .then(signUser => {
        if (signUser.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, signUser[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: signUser[0].email,
                    signUserId: signUser[0]._id
                }, process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: signUser,
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            })
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})

// DENNE KAN DELETE BRUGER
router.delete('/:signUserId', (req, res, next) => {
    userSign.findByIdAndDelete(eq.params.signUserId)
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

module.exports = router;
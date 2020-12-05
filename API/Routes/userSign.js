const express = require('express');
// FORKLARING, VIDEO 3 - 1MIN
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSign = require('../Models/userSign');

router.post('/signup', async (req, res, next) => {
    console.log(req.body);
        await userSign.find({email: req.body.email})
        .exec()
        .then(signUser => {
            if (signUser.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    console.log('21');
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        console.log('27')
                    const signUser = new userSign({
                        _id: new mongoose.Types.ObjectId(), 
                        email: req.body.email,
                        password: hash,
                        gender: req.body.gender,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        birthday: req.body.birthday
                        //bio: req.body.bio
                        });
                        console.log('38')
                        signUser
                        .save()
                        .then(result =>{
                            console.log(result);
                            res.status(201).json({
                                message: result
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
            console.log('70');
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
router.delete('/:signUserId', async (req, res, next) => {
    await userSign.findByIdAndDelete(req.params.signUserId)
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

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = {new: true}
        const result = await userSign.findByIdAndUpdate(id, { $set:updates}, options);
        res.send(result);
        console.log('125');
    } catch (error) {
        console.log(error.message);
        console.log('128')
    }
})

/*router.put("/update", (req, res) => {
    userSign.findByIdAndUpdate({id: req.user._id}, req.body)
    .then(function(){
        res.send("Succes");
    })
});*/

module.exports = router;
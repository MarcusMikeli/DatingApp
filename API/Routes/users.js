const express = require('express');
// FORKLARING, VIDEO 3 - 1MIN
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../Models/user');
const { response } = require('../../app');

router.get('/', (req, res, next) => {
    User.find()
    .select('name price _id')
    .exec().
    then(docs => {
        const response = {
            count: docs.length,
            users: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    id_: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + doc._id
                    }
                }
            })
        }
        // if (docs.length >= 0) {
            res.status(200).json(response);
        /* } else {
            res.status(404).json({
                message: 'No entries found'
            })
        }*/
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const user = new User ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    user
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Created user succesfully',
            createdUser: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/users/' + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err  
        });   
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .select('name price _id')
    .exec()
    .then(doc => {
        console.log('From database', doc);
        if(doc) {
            res.status(200).json({
                user: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/users'
                }
            })
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/users/' + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/users',
                body: { name: 'String', price: 'Number' }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
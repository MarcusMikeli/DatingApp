const express = require('express');
// FORKLARING, VIDEO 3 - 1MIN
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Match = require('../Models/match');
const User = require('../Models/user');
//const MatchController = require('../Controllers/match');


router.get('/', checkAuth, (req, res, next) => {
    Match.find()
    .select('match quantity _id')
    .populate('match', 'name')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            matchs: docs.map(doc =>{
                return {
                    _id: doc._id,
                    match: doc.match,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/match/' + doc._id
                    }
                };
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', checkAuth, (req, res, next) => {
    User.findById(req.body.userId)
        .then(user => {
            if(!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            const match = new Match ({
                _id: mongoose.Types.ObjectId(),
                user: req.body.userId,
                quantity: req.body.quantity
            });
            return match.save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdMatch: {
                    _id: result._id,
                    match: result.match,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/match/' + result._id
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

router.get('/:matchId', checkAuth, (req, res, next) => {
    Match.findById(req.params.matchId)
    .populate('match')
    .exec()
    .then(match => {
        if (!match) {
            return res.status(404).json({
                message: "Match not found"
            });
        }
        res.status(200).json({
            match: match,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/match'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:matchId', checkAuth, (req, res, next) => {
    Match.remove({_id: req.params.matchId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Match deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/match',
                body: {userId: 'ID', quantity: 'Number'}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
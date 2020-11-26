const express = require('express');
// FORKLARING, VIDEO 3 - 1MIN
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Match were fetched'
    });
});

router.post('/', (req, res, next) => {
    const match = {
        matchId: req.body.matchId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Match was made',
        match: match
    });
});

router.post('/:matchId', (req, res, next) => {
    res.status(200).json({
        message: 'Match details',
        matchId: req.params.orderId
    });
});

router.delete('/:matchId', (req, res, next) => {
    res.status(200).json({
        message: 'Match deleted',
        matchId: req.params.matchId
    });
});

module.exports = router;
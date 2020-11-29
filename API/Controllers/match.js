const mongoose = require('mongoose');
const Match = require('../Models/match');

exports.match_get_all = (req, res, next) => {
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
}
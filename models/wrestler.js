const mongoose = require('mongoose');

const wrestlerSchema = new mongoose.Schema({
    ringName: {
        type: String,
    },
    hometown: {
        type: String,
    },
    finishingMove: {
        type: String,
    },
    signatureMoves: [{
        type: String
    }]
});

module.exports = Wrestler;
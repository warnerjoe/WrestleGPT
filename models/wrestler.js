const mongoose = require('mongoose');

const WrestlerSchema = new mongoose.Schema({
    ringName: {
        type: String,
        required: true,
      },
    hometown: {
        type: String,
        required: true,
      },
    finishingMove: {
        type: String,
        required: true,
      },
    signatureMoves: [{
        type: String
    }]
});

module.exports = mongoose.model('Wrestler', WrestlerSchema)
const mongoose = require('mongoose')

const fortunesSchema = new mongoose.Schema({
    fortune: {type: String, required: true},
})

const Fortune = mongoose.model('Fortune', fortunesSchema)

module.exports = Fortune;
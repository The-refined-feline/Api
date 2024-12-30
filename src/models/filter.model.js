const mongoose = require('mongoose')

const FilterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Education', 'body-type', 'chieldren', 'drinking', 'seeking', 'smoking', 'ethnicity', 'relationship-status'],
        default: ''
    }
},
    {
        timestamps: true
    });

const Filter = mongoose.model('Filter', FilterSchema)

module.exports = Filter;
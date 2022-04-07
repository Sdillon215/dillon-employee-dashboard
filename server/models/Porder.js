const mongoose = require('mongoose');
const porderItemSchema = require('./PorderItems');
const { Schema } = mongoose;

const porderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    orderTotal: {
        type: Number,
        required: true,
        min: 0
    },
    porderItems: [porderItemSchema]
});

const Porder = mongoose.model('Porder', porderSchema);

module.exports = Porder;
const mongoose = require('mongoose');
const saleItemSchema = require('./SaleItems');
const { Schema } = mongoose;

const sorderSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    saleDate: {
        type: Date,
        default: Date.now
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    saleTotal: {
        type: Number,
        required: true,
        min: 0
    },
    saleItems: [saleItemSchema]
});

const Sorder = mongoose.model('Sorder', sorderSchema);

module.exports = Sorder;
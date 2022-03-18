const mongoose = require('mongoose');

const { Schema } = mongoose;

const porderSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    supplyTotal: {
        type: Number,
        required: true,
        min: 0
    },
    freshTotal: {
        type: Number,
        required: true,
        min: 0
    },
    plantTotal: {
        type: Number,
        required: true,
        min: 0
    },
    total: {
         type: Number,
         required: true,
          min: 0
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        {
            quantity: Number
        }
    ]
});

const Porder = mongoose.model('Porder', porderSchema);

module.exports = Porder;
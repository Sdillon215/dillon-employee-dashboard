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
    quantity: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
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
        }
    ]
});

const Porder = mongoose.model('Porder', porderSchema);

module.exports = Porder;
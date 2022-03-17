const mongoose = require('mongoose');

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
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Sorder = mongoose.model('Sorder', sorderSchema);

module.exports = Sorder;
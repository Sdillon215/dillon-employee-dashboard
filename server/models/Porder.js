const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema } = mongoose;

const porderSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productName: {
        type: String,
        required: true
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
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Porder = mongoose.model('Porder', porderSchema);

module.exports = Porder;
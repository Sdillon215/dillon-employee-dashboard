const mongoose = require('mongoose');

const { Schema } = mongoose;

const saleItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
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
    productTotal: {
         type: Number,
         required: true,
          min: 0
        }
    }
);


module.exports = saleItemSchema;
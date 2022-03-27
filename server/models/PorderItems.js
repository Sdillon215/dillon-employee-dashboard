const mongoose = require('mongoose');

const { Schema } = mongoose;

const porderItemSchema = new Schema({
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
    productTotal: {
         type: Number,
         required: true,
          min: 0
        }
    }
);

// const PorderItems = mongoose.model('PorderItems', porderItemSchema);

module.exports = porderItemSchema;
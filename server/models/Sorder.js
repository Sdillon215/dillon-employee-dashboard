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
    //   get: timestamp => dateFormat(timestamp)
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
    salePrice: {
        type: Number,
        required: true
    },
    total: {
         type: Number,
         required: true,
          min: 0
        }
    }
    // {
    //     toJSON: {
    //         getters: true
    //     }
    // }
);

const Sorder = mongoose.model('Sorder', sorderSchema);

module.exports = Sorder;
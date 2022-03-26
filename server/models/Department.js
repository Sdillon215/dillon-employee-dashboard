const mongoose = require('mongoose');

const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  porders: [
    {
      type:Schema.Types.ObjectId,
      ref: 'Porder'
    }
  ],
  sorders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sorder'
    }
  ]
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
const mongoose = require('mongoose');

// mongodb shopping-cart
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dillon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
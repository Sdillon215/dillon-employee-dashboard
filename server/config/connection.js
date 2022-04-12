const mongoose = require('mongoose');

// mongodb dillon
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dillon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/',
    {
      dbName: 'data_portf',
      useNewUrlParser: true
    })

    console.log('Successfuly connected mongodb!')
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB
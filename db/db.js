const mongoose = require('mongoose')
const constants = require("../constants")

mongoose.connect(constants.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
},
err => {
  if (err) {
    console.log(err.message);
    throw new Error('Error Connecting to Database');
  }
})
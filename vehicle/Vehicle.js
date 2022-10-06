const mongoose = require('mongoose');
const vehicleSchema = mongoose.Schema({
  vehicleRegistrationNumber: {
    type: String,
    require: true,
    unique: true
  },
  registeredDate: {
    type: String,
    require: true
  },
  chassisNumber: {
    type: Number,
    require: false
  }
})

const Vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = Vehicle;
const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const quotaSchema = mongoose.Schema({
  vehicleID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "vehicles",
  },
  connectedDeviceId: {
    type: Schema.Types.ObjectId,
    ref: "connectedDevices",
  },
  lastUsedDate: { type: Date, default: null },
  isActive: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const Quota = mongoose.model("quota", quotaSchema);

module.exports = Quota;
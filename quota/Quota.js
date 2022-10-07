const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const quotaSchema = mongoose.Schema({

  vehicleID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "vehicles",
  },

  maxQuota: {
    type: Number,
    required: false,
  },
  remainingQuota: {
    type: Number,
    require: false
  },
  usedQuota: {
    type: Number,
    require: false
  },
  connectedDeviceId: {
    type: Schema.Types.ObjectId,
    ref: "connectedDevices",
  },
  lastUsedDate: { type: Date, },
  isActive: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const Quota = mongoose.model("quota", quotaSchema);

module.exports = Quota;
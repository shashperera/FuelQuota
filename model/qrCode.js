<<<<<<< HEAD
// const mongoose = require("mongoose");
// const { Schema } = mongoose;
//
// const qrCodeSchema = new mongoose.Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     required: true,
//     ref: "vehicles",
//   },
//   connectedDeviceId: {
//     type: Schema.Types.ObjectId,
//     ref: "connectedDevices",
//   },
//   lastUsedDate: { type: Date, default: null },
//   isActive: { type: Boolean, default: false },
//   disabled: { type: Boolean, default: false },
// });
//
// module.exports = mongoose.model("qrCode", qrCodeSchema);
=======
const mongoose = require("mongoose");
const { Schema } = mongoose;

const qrCodeSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  connectedDeviceId: {
    type: Schema.Types.ObjectId,
    ref: "connectedDevices",
  },
  lastUsedDate: { type: Date, default: null },
  isActive: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

module.exports = mongoose.model("qrCode", qrCodeSchema);
>>>>>>> 8eb6d24c62db33d2cd33571d6fd0723f14d83b13

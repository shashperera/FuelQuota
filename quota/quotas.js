require("dotenv").config();
const express = require('express');
const  mongoose = require("mongoose");
const axios = require('axios');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const QR = require("qrcode");
const User = require("../auth/Auth");
const Vehicle = require("../vehicle/Vehicle");
const ConnectedDevice = require("../quota/connectedDevice");

// Connect
require('../db/db');

const Quota = require('./Quota');

const app = express();
const port = 9000;
app.use(express.json())

app.post('/quota', (req, res) => {
  const newQuota = new Quota({
    customerID: mongoose.Types.ObjectId(req.body.customerID),
    bookID: mongoose.Types.ObjectId(req.body.bookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate
  });
  newQuota.save().then(() => {
    res.send('New Order created successfully!')
  }).catch((err) => {
    res.status(500).send('Internal Server Error!');
  })
})

app.get('/quotas', (req, res) => {
  Quota.find().then((orders) => {
    if (orders) {
      res.json(orders)
    } else {
      res.status(404).send('Quota not found');
    }
  }).catch((err) => {
    res.status(500).send('Internal Server Error!');
  });
})
app.post("/quota/update", async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate user input
    if (!userId) {
      res.status(400).send("User Id is required");
    }

    const user = await User.findById(userId);

    // Validate is user exist
    if (!user) {
      res.status(400).send("User not found");
    }

    const qrExist = await Quota.findOne({ userId });

    // If qr exist, update disable to true and then create a new qr record
    if (!qrExist) {
      await Quota.updateOne({ userId });
    } else {
      await Quota.findOneAndUpdate({ userId }, { $set: { disabled: true } });
      await Quota.create({ userId });
    }

    // Return qr code
    return res.status(200).json({ dataImage });
  } catch (err) {
    console.log(err);
  }
});

// app.post("/quota/generate", async (req, res) => {
//   try {
//     const { userId } = req.body;
//
//     // Validate user input
//     if (!userId) {
//       res.status(400).send("User Id is required");
//     }
//
//     const user = await User.findById(userId);
//
//     // Validate is user exist
//     if (!user) {
//       res.status(400).send("User not found");
//     }
//
//     const qrExist = await Quota.findOne({ userId });
//
//     // If qr exist, update disable to true and then create a new qr record
//     if (!qrExist) {
//       await Quota.create({ userId });
//     } else {
//       await Quota.findOneAndUpdate({ userId }, { $set: { disabled: true } });
//       await Quota.create({ userId });
//     }
//
//     // Generate encrypted data
//     const encryptedData = jwt.sign(
//         { userId: user._id },
//         process.env.TOKEN_KEY,
//         {
//           expiresIn: "1d",
//         }
//     );
//
//     // Generate qr code
//     const dataImage = await QR.toDataURL(encryptedData);
//
//     // Return qr code
//     return res.status(200).json({ dataImage });
//   } catch (err) {
//     console.log(err);
//   }
// });

app.post("/quotaV/generate", async (req, res) => {
  try {
    const { vehicleID } = req.body;

    // Validate user input
    if (!vehicleID) {
      res.status(400).send("Vehicle Id is required");
    }

    const vehicle = await Vehicle.findById(vehicleID);

    // Validate is user exist
    if (!vehicle) {
      res.status(400).send("User not found");
    }

    const qrExist = await Quota.findOne({ vehicleID });

    // If qr exist, update disable to true and then create a new qr record
    if (!qrExist) {
      await Quota.create({ vehicleID });
    } else {
      await Quota.findOneAndUpdate({ vehicleID }, { $set: { disabled: true } });
      await Quota.create({ vehicleID });
    }

    // Generate encrypted data
    const encryptedData = jwt.sign(
        { vehicleID: vehicle._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1d",
        }
    );

    // Generate qr code
    const dataImage = await QR.toDataURL(encryptedData);

    // Return qr code
    return res.status(200).json({ dataImage });
  } catch (err) {
    console.log(err);
  }
});


app.post("/quota/scan", async (req, res) => {
  try {
    const { token, deviceInformation } = req.body;

    if (!token && !deviceInformation) {
      res.status(400).send("Token and deviceInformation is required");
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const qrCode = await Quota.findOne({
      userId: decoded.userId,
      disabled: false,
    });

    if (!qrCode) {
      res.status(400).send("QR Code not found");
    }

    const connectedDeviceData = {
      userId: decoded.userId,
      qrCodeId: qrCode._id,
      deviceName: deviceInformation.deviceName,
      deviceModel: deviceInformation.deviceModel,
      deviceOS: deviceInformation.deviceOS,
      deviceVersion: deviceInformation.deviceVersion,
    };

    const connectedDevice = await ConnectedDevice.create(connectedDeviceData);

    // Update qr code
    await Quota.findOneAndUpdate(
        { _id: qrCode._id },
        {
          isActive: true,
          connectedDeviceId: connectedDevice._id,
          lastUsedDate: new Date(),
        }
    );

    // Find user
    const user = await User.findById(decoded.userId);

    // Create token
    const authToken = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    // Return token
    return res.status(200).json({ token: authToken });
  } catch (err) {
    console.log(err);
  }
});


app.listen(port, () => {
  console.log(`Up and Running on port ${port} - This is Quota service`);
})
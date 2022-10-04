require("dotenv").config();
const express = require('express');

// Connect
require('../db/db');

const Vehicle = require('./Vehicle');

const app = express();
const port = 3000;
app.use(express.json())

app.post('/vehicle', (req, res) => {
  const newVehicle = new Vehicle({...req.body});
  newVehicle.save().then(() => {
    res.send('New Vehicle created successfully!')
  }).catch((err) => {
    res.status(500).send('Internal Server Error!');
  })
})

app.get('/vehicles', (req, res) => {
  Vehicle.find().then((vehciles) => {
    if (vehciles.length !== 0) {
      res.json(vehciles)
    } else {
      res.status(404).send('Vehicles not found');
    }
  }).catch((err) => {
    res.status(500).send('Internal Server Error!');
  });
})

app.get('/vehicle/:id', (req, res) => {
  Vehicle.findById(req.params.id).then((vehicle) => {
    if (vehicle) {
      res.json(vehicle)
    } else {
      res.status(404).send('Vehicles not found');
    }
  }).catch((err) => {
    res.status(500).send('Internal Server Error!');
  });
})

app.delete('/vehicle/:id', (req, res) => {
  Vehicle.findOneAndRemove(req.params.id).then((vehicle) => {
    if (vehicle) {
      res.json('Vehicle deleted Successfully!')
    } else {
      res.status(404).send('Vehicle Not found!');
    }
  }).catch((err) => {
    res.status(500).send('Internal Server Error!');
  });
});

app.listen(port, () => {
  console.log(`Up and Running on port ${port} - This is Vehicle service`);
})
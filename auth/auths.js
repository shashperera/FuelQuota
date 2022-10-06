require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const express = require('express');

// Connect
require('../db/db');

const Auth = require('./Auth');

const app = express();
const port = 5000;
app.use(express.json())

app.post('/user', (req, res) => {
  const newUser = new Auth({...req.body});
  newUser.save().then(() => {
    res.send('New Customer created successfully!');
  }).catch((err) => {
    res.status(500).send('Internal Server Error!');
  })
})

app.get('/users', (req, res) => {
  Auth.find().then((users) => {
    if (users) {
      res.json(users)
    } else {
      res.status(404).send('customers not found');
    }
  }).catch((err) => {
    res.status(500).send('Internal Server Error!');
  });
})

// app.get('/customer/:id', (req, res) => {
//   Customer.findById(req.params.id).then((customer) => {
//     if (customer) {
//       res.json(customer)
//     } else {
//       res.status(404).send('customer not found');
//     }
//   }).catch((err) => {
//     res.status(500).send('Internal Server Error!');
//   });
// })

// app.delete('/customer/:id', (req, res) => {
//   Customer.findByIdAndRemove(req.params.id).then((customer) => {
//     if (customer) {
//       res.json('customer deleted Successfully!')
//     } else {
//       res.status(404).send('Customer Not Found!');
//     }
//   }).catch((err) => {
//     res.status(500).send('Internal Server Error!');
//   });
// });
app.post("/register", async (req, res) => {
  // Our register logic starts here

  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Auth.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Auth.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // return new user
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await Auth.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // user
      return res.status(200).json({ token });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
});


app.listen(port, () => {
  console.log(`Up and Running on port ${port}- This is User Auth service`);
})
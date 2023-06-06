const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({});

// Middleware to parse JSON data
app.use(express.json());

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: process.env.Host,
      port: 587,
    secure: false,
  auth: {
    user: process.env.Username,
    pass: process.env.Password
  }
});

// Endpoint for sending email
app.post('/send-email', (req, res) => {

  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.FROM,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv =  require("dotenv")
dotenv.config({path: "./.env"})
const app = express();
app.use(bodyParser.json());

app.post('/sendotp', async (req, res) => {
    
  try {
    
    const otp = Math.floor(100000 + Math.random() * 900000)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      },);

    await transporter.sendMail({
      from: process.env["EMAIL"],
      to: req.body.email,
      subject: 'OTP Verification',
      text: `Your OTP is ${otp}`,
    });

    res.send({ success: true, otp: otp, });
  } catch (error) {
    console.error(error);
    console.log( process.env.PASS)
    res.status(500).send({ error: 'An error occurred',});
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server Listening on ", port)
})
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/sendContactEmail", async (req, res) => {
  await transporter.sendMail(
    {
      from: process.env.EMAIL_USER, // Add Mail Hear
      to: "utsavvasoya99@gmail.com", // Add Mail Hear
      subject: `Reseller Query by ${req.body.fname}`, // Subject line

      text: `Name: ${req.body.fname} email:${req.body.email} messaage: ${req.body.comment}`, // plain text body

      html: `<p> 
              <h1> Reseller Query </h1>
              <hr>
              First Name: ${req.body.fname}
              <hr>
              Last Name: ${req.body.lname}
              <hr>
              Email: ${req.body.email}
              <hr>
              Phone Number: ${req.body.phone}
              <hr>
              Company Name: ${req.body.companyName}
              <hr>
              Website Name: ${req.body.websiteName}
              <hr>
              Average no of orders: ${req.body.noOfOrders}
              <hr> 
              Comment Regarding Quotation: ${req.body.comment}
              <hr> 
              <br> 
              </p>`, // html body
    },
    (err, info) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Mail Send Error",
        });
      } else {
        res.status(201).send({
          success: true,
          message: "Contact Mail Send!!",
        });
      }
    }
  );
});

module.exports = router;
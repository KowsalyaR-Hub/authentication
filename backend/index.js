const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send email function
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};

// Login route
app.post('/login', async (req, res) => {
    const { username, password, phone, email } = req.body;

    // Hardcoded credentials for example
    const validUser = process.env.VALID_USER;
    const validPassword = process.env.VALID_PASSWORD;
    const validPhone = process.env.VALID_PHONE;

    if (username === validUser && password === validPassword && phone === validPhone) {
        console.log(`User: ${username}, Password: ${password}, Phone: ${phone}`);

        try {
            await sendEmail(email, 'Login Successful', 'You have successfully logged in.');
            res.json({ message: 'Login Successful', success: true });
        } catch (error) {
            console.error('Error sending email:', error);
            res.json({ message: 'Login Successful, but failed to send email', success: true });
        }
    } else {
        res.json({ message: 'Login Failed', success: false });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

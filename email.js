const nodemailer = require('nodemailer');

const { GMAIL_ID, GMAIL_PASSWORD, FROM_EMAIL, TO_EMAIL} = process.env;
const emailController = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_ID,
            pass: GMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: 'Email Subject | Sending Email using Node.js',
        text: 'Email Body | That is the body content of email to be sent to receiver.',
        attachments: [
            {
                filename: 'notes.txt',
                content: 'Hello! This is the content of text file attached in the email.'
            },
            {
                filename: 'PDF.pdf',
                path: './test-pdf.pdf'
            }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('Error in sending email!')
        } else {
            res.send('Email sent!')
            console.log('Email sent: ' + info.response);
        }
    });
    
};

module.exports.emailController = emailController;
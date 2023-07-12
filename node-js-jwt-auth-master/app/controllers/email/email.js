exports.sendEmail = (from, to, subject, body) => {

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "af70e5c9e58483",
          pass: "a7c80bdccd2723"
        }

    });

    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: body,
    };

    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:' + info.response);
        }
    });

};
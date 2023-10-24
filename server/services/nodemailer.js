const nodemailer = require('nodemailer');
const { TRT_EMAIL, TRT_PASSWORD } = require("../constants");

let transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: TRT_EMAIL,
    pass: TRT_PASSWORD
  }
});

exports.sendApprovalEmail = (to, firstName, lastName, cvPath) => {
  let mailOptions = {
    from: TRT_EMAIL,
    to: to,
    subject: 'Candidature approuvée',
    text: `La candidature de ${firstName} ${lastName} a été approuvée. Veuillez trouver ci-joint son CV.`,
    attachments: [
      {
        filename: "CV.pdf",
        path: cvPath
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
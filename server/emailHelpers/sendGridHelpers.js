const environment = require('../environment/developement.js');
const mailGunHelpers = require('./mailGunHelpers.js'); // secondary email provider

const helper = require('sendgrid').mail;
const sg = require('sendgrid')(environment.SENDGRID_API_KEY);

// module.exports.sendMail = (req, res, next) => {
//   let from_email = new helper.Email('jordanchong23@gmail.com');
//   let to_email = new helper.Email('jordanchong23@gmail.com');
//   let subject = "3-Hello World from the SendGrid Node.js Library!";
//   let content = new helper.Content('text/plain', "Hello, Email!");
//   let mail = new helper.Mail(from_email, subject, to_email, content);
//   let request = sg.emptyRequest({
//     method: 'POST',
//     path: '/v3/mail/send',
//     body: mail.toJSON(),
//   });
//   sg.API(request, function(error, response) {
//     if(error) {
//       console.log(error);
//       // attempt with secondary provider in error case
//       mailGunHelpers.sendMail(req, res, next);
//     } else {
//       res.json(response);
//     }
//   });
// };

module.exports.socketSGSendMail = (data, socket) => {
  let from_email = new helper.Email(data.from_email);
  let to_email = new helper.Email(data.to_email);
  let subject = data.subject + ' (SendGrid)';
  let content = new helper.Content('text/plain', data.body);
  let mail = new helper.Mail(from_email, subject, to_email, content);
  let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });
  sg.API(request, function(error, response) {
    if(error) {
      console.log(error);
      // attempt with secondary provider in error case
      mailGunHelpers.socketMGSendMail(data, socket);
    } else {
      // console.log(response);
      socket.emit('mail_sent_sg', 'Mail successfully sent with SendGrid');
    }
  });
};






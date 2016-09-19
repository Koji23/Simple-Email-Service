const mailgun = require('mailgun-js');
const environment = require('../environment/developement.js');
// const sendGridHelpers = require('./sendGridHelpers.js');  // primary email provider

// module.exports.sendMail = (req, res, next) => {
//   let from_email = 'jordanchong23@gmail.com';
//   let to_email = 'jordanchong23@gmail.com';
//   let mg = new mailgun({
//     apiKey: environment.MAILGUN_API_KEY,
//     domain: environment.MAILGUN_DOMAIN,
//   })

//   let data = {
//     from: 'jordanchong23@gmail.com',
//     to: 'jordanchong23@gmail.com',
//     subject: 'Mailgun Hello World',
//     html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + 'jordanchong23@gmail.com' + '">Click here to add your email address to a mailing list</a>'
//   };

//   mg.messages().send(data, function(err, body) {
//     if(err) {
//       console.log('Error:', err);
//       res.json(err);
//     } else {
//       console.log('Body:', body);
//       res.json(body);
//     }
//   });
// }

module.exports.socketMGSendMail = (data, socket) => {
  // let from_email = data.from_email;
  // let to_email = data.to_email;
  let mg = new mailgun({
    apiKey: environment.MAILGUN_API_KEY,
    domain: environment.MAILGUN_DOMAIN,
  })

  let recievedData = {
    from: data.from_email,
    to: data.to_email,
    subject: data.subject + ' (MailGun)',
    html: data.body
    // html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + 'jordanchong23@gmail.com' + '">Click here to add your email address to a mailing list</a>'
  };

  mg.messages().send(recievedData, function(err, body) {
    if(err) {
      // console.log('Error:', err);
      socket.emit('mail_failed_to_send', err);
    } else {
      // console.log('Body:', body);
      socket.emit('mail_sent_mg', 'Mail successfully sent with MailGun');
    }
  });
}





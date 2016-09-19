const mailgun = require('mailgun-js');
const environment = require('../environment/developement.js');
// const sendGridHelpers = require('./sendGridHelpers.js');  // primary email provider


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

  return data;
}





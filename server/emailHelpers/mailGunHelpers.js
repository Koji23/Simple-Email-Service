const mailgun = require('mailgun-js');
const environment = require('../environment/developement.js');
// const sendGridHelpers = require('./sendGridHelpers.js');  // primary email provider

module.exports.sendMail = (req, res, next) => {
  let from_email = 'jordanchong23@gmail.com';
  let to_email = 'jordanchong23@gmail.com';
  let mg = new mailgun({
    apiKey: environment.MAILGUN_API_KEY,
    domain: environment.MAILGUN_DOMAIN,
  })

  let data = {
    from: 'jordanchong23@gmail.com',
    to: 'jordanchong23@gmail.com',
    subject: 'Mailgun Hello World',
    html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + 'jordanchong23@gmail.com' + '">Click here to add your email address to a mailing list</a>'
  };

  mg.messages().send(data, function(err, body) {
    if(err) {
      console.log('Error:', err);
      res.json(err);
    } else {
      console.log('Body:', body);
      res.json(body);
    }
  });
}
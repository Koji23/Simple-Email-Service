const mailgun = require('mailgun-js');
const environment = require('../environment/developement.js');

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
    html: 'Hello World, this is Mailgun!'
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
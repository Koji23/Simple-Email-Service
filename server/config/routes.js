var sendGridHelpers = require('../emailHelpers/sendGridHelpers.js');
let mailGunHelpers = require('../emailHelpers/mailGunHelpers.js');

module.exports = function(app) {
  app.post('/send', (req, res, next) => {
    sendGridHelpers.sendMail(req, res, next);
    // mailGunHelpers.sendMail(req, res, next);
  });
};
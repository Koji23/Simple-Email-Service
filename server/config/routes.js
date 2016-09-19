var sendGridHelpers = require('../emailHelpers/sendGridHelpers.js');
let mailGunHelpers = require('../emailHelpers/mailGunHelpers.js');

module.exports = function(app, io) {
  // API Routes
  app.post('/send', (req, res, next) => {
    sendGridHelpers.sendMail(req, res, next);
    // mailGunHelpers.sendMail(req, res, next);
  });
  // socket events 
  io.on('connection', function(socket) {
    console.log('Connection ESTABLISHED!');
    socket.on('send_email', function(data) {
      console.log('Recieved data: ', data);
      sendGridHelpers.socketSGSendMail(data);
    });
  });
};
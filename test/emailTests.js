var chai = require('chai');
var expect = chai.expect;
var sendGridHelpers = require('../server/emailHelpers/sendGridHelpers.js');
let mailGunHelpers = require('../server/emailHelpers/mailGunHelpers.js');

describe('email helper functions', function() {
  before(function() {
    global.dummyData = {
      from_email: 'testAddress@gmail.com',
      to_email: 'testAddress@gmail.com',
      subject: 'Hello World',
      body: "Testing email service"
    }
  });
  it('should recieve data for SendGrid', function() {
    expect(sendGridHelpers.socketSGSendMail(dummyData)).to.equal(dummyData);
  });
  it('should recieve data for MailGun', function() {
    expect(mailGunHelpers.socketMGSendMail(dummyData)).to.equal(dummyData);
  });
});
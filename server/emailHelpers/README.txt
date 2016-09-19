Isomorphic Email App

Start
1.) Start Redis on seperate terminal tab - 'redis-server'
2.) Start app by running - 'npm start'


Simple Email Service (current repo)

Start
1.)  Start service by running - 'npm start'

////////////////////////////////////////////////////////////////////////////////

Control Flow:
- React email client is rendered server side and provided on default route
- Data from the email client is sent to server via socket connection on submit
- Email server adds email data to a Redis queue for job processing
- Email jobs are processed by Simple Email Service 
- Email service recieves jobs via socket connection
- Email service will attempt to send email via SendGrid first
- Failed attempts with SendGrid will default to Mailgun
- Successful attempts with either API will fire a completion event back to Isomorphic Email App Server
- Failed attempts with both API's will fire an error event
  - Redis queue will notice error events and will make up to 3 additional attempts to process job
  - Redis queue will wait 3 seconds between each attempt
  - if final attempt does not succeed, email job will be saved to failed jobs (http://localhost:3000/queue/failed)
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('file.log',{
  interval:'1d',
  path: logDirectory
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTPUSER,
      pass: process.env.SMTPPASS
    },
  },
  google_clientID:
    "566408813929-8u6ivuk2ramnuirdkvuunl48s91i49rf.apps.googleusercontent.com",
  google_client_Secret: "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",
  google__callbackURL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codeial",
  morgan:{
    mode:'dev',
    options:{stream:accessLogStream}
  }
};

const production = {
  name: "production",
};

module.exports = development;

//module.exports = eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
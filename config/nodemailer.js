const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'gagandahiya64@gmail.com',
        pass:  'app password'
    }
});

let renderTemplate = (data, relativePath)=>{
    let mainHTML;
    ejs.render(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function (err,template) {
            if(err){console.log('render template error',err);return;}
            mainHTML=template;
        }
    )
    return mainHTML;
}

module.exports= {
    transporter: transporter,
    renderTemplate: renderTemplate
}
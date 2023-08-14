const nodeMailer = require('../config/nodemailer');

// this is another way of exporting method

exports.newComment = (comment)=>{
    console.log('inside newcomment mailer');
    
    nodeMailer.transporter.sendMail({
        from: 'gagandahiya64',
        to: comment.user.email,
        subject: 'New comment Published',
        html: '<h1> New comment is published </h1>',
    },(err,info)=>{
        if(err){console.log('Error in sending mail',err);return;}
        console.log('Message sent',info);
        return;
    });
}
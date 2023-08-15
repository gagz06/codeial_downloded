const nodeMailer = require('../config/nodemailer');

// this is another way of exporting method

exports.newComment = (comment)=>{
    // console.log('inside newcomment mailer');
    // console.log('******',comment);
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'gagandahiya64@gmail.com',
        to: comment.user.email,
        subject: 'New comment Published',
        html: htmlString         //  use tables for mail views as they domt reform from screen size change 
        //or mobile view and desktop view
    },(err,info)=>{
        if(err){console.log('Error in sending mail',err);return;}
        console.log('Message sent',info);
        return;
    });
}
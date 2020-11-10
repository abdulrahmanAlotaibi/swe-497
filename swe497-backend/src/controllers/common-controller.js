const EmailService = require("../services/email-service")


exports.contactUs = async (req,res,next)=>{
    const {senderEmail, title, message} = req.body;
    console.log(senderEmail,title, message)
    const email = await EmailService.contactUs(senderEmail, title, message)

    res.status(200).json({
        status:"success",
        data:{
            email
        }
    })
}

exports.sendEmail = ()=>{

}
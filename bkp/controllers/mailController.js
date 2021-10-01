const nodemailer = require("nodemailer");
const config = require('../../config')
module.exports = {
    sendMail: (req, res)=>{

        let transport = nodemailer.createTransport({
            host: config.hostMail,
            port: config.portMail,
            secure: true,
            auth: {
                user: config.email,
                pass: config.senhaMail
            }
        })

        transport.sendMail({
            from: "Pelucio Adv <cortezvinicius881@gmail.com>",
            to: req.body.email,
            subject: req.body.title,
             text: req.body.msg,
             html: "<p>"+req.body.msg+"</p>",
            }).then(message=>{
            res.status(200).json({msg: "E-mail enviado com sucesso"})
        }).catch(error=>{
            res.status(500).json({msg: "Ocorreu um erro !"})
        })

        
    }
}
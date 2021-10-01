const nodemailer = require("nodemailer");
const config = require('../../config')
module.exports = {
    sendMail: (req, res)=>{

        let transport = nodemailer.createTransport({
            host: config.hostMail,
            port: config.portMail,
            secure: true,
			secureConnection: true,
            auth: {
                user: config.email,
                pass: config.senhaMail
            }
        })

        transport.sendMail({
            from: "Pelucio Adv <"+config.email+">",
            to: req.body.email,
            subject: req.body.title,
             text: req.body.msg,
             html: req.body.html,
            }).then(message=>{
            res.status(200).json({msg: "E-mail enviado com sucesso"})
        }).catch(error=>{
            res.status(500).json({msg: "Ocorreu um erro !", error: error})
        })

        
    }
}
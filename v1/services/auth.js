const config = require('../../config')
const jwt = require('jsonwebtoken')
const base64 = require('base-64')

const {SECRET} = config;

module.exports = {
    token: (data)=>
    {
        const token = jwt.sign({id: data.id, nome: data.nome ,user: data.user, email: data.email, tipo: data.tipo}, SECRET, {expiresIn: "1d"});
        return base64.encode(token)
    },
    authorize: function(req, res, next)
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(!token)
        {
            res.status(401).json({error: "token Inválido."})
        }else
        {
            token = base64.decode(token);
           jwt.verify(token, SECRET, function(error, decoded)
           {
               if(error)
               {
                res.status(401).json({error: "token Inválido."})
               }else
               {
                   next();
               }
           });
        }
    },
    decodeToken: (token)=>
    {
        token = base64.decode(token);
        try 
        {
            var decoded = jwt.verify(token, SECRET);
            return decoded
        }catch(err) {
            return err;
        }
    }
}
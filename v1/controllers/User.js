const mysql = require('../DB/db').conection;
var bcryptjs = require('bcryptjs');
const auth = require('../services/auth');



module.exports = {
    listAll: (req, res)=>
    {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];


        const token_decode = auth.decodeToken(token)
        
        if(token_decode.tipo == 1)
        {
            mysql.query(
                "SELECT id, nome, email, user, tipo FROM user_admin WHERE id != ?;",
                [token_decode.id],
                (error, resultado, fields)=>
                {
                    if(error) return res.status(500).json({error: error})
                    res.status(200).json({msg: null, data: resultado})
                }
            );
        }else 
        {
            res.status(401).json({
                msg:"Acesso negado",
                data: null
            })
        }
    },
    create: async (req, res)=>
    {

        const password = await bcryptjs.hash(req.body.senha, 7);

        mysql.query(
            "INSERT INTO user_admin(nome, email, user, hash, tipo)VALUES(?, ?, ?, ?, ?);",
            [req.body.nome, req.body.email, req.body.user, password, req.body.tipo],
            (error, resultado, fields)=>
            {
                if(error)
                {
                    res.status(500).json(error)
                }
                res.status(201).json({msg:"certo"})
            }
        )
    },
    getUser: (req, res)=>
    {

        const {id} = req.params;

        mysql.query(
            "SELECT nome, email, user, tipo FROM user_admin WHERE id = ?;",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json(resultado[0])
            }
        );
    },
    update: async(req, res)=>
    {

        const password = await bcryptjs.hash(req.body.senha, 7);
        const {nome, email, user, tipo} = req.body;
        const {id} = req.params;

        mysql.query(
            "UPDATE user_admin SET nome = ?, email = ?, user = ?, hash = ?, tipo = ? WHERE id = ?;",
            [nome, email, user, password, tipo, id],
            (error, resultado, fields)=>
            {
                if(error)
                {
                    res.status(500).json(error)
                }
                res.status(200).json({msg:"Usuário atualizado com sucesso"})
            }
        )
    },
    delete: (req, res)=>
    {
        const {id} = req.params;
        console.log(id)
        mysql.query(
            "DELETE FROM user_admin WHERE id = ?;",
            [id],
            (error, resultado, fields)=>
            {
                if(error)
                {
                    res.status(500).json(error)
                }
                res.status(200).json({msg:"Usuário deletado com sucesso"})
            }
        )
    },
    verifyUser: (req, res, next)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var id = req.params.id
        const token_decode = auth.decodeToken(token)
        if(token_decode.tipo == 1)
        {
            mysql.query(
                "SELECT * FROM user_admin WHERE id = ?",
                [id],
                (error, resultado, fields)=>
                {
                    if(error)
                    {
                        res.status(500).json({error})
                    }else
                    {
                        (resultado.length > 0) ? next() : res.status(404).json({msg:"Usuário Inválido"})
                    }
                }
            )
        }else
        {
            res.status(401).json({msg:"Acesso negado"});
        }
    },
    login: (req, res)=>
    {
        const user = req.body.user;

        if(req.body.user != null && req.body.senha != null)
        {
            mysql.query(
                "SELECT * FROM user_admin WHERE user = ?;",
                [user],
                (error, resultado, fields)=>
                {
                    if(error)
                    {
                        res.status(500).json(error)
                    }else
                    {
                        var dados = resultado[0];
    
                        let senhaUserEncrypt = dados.hash;
    
                        bcryptjs.compare(req.body.senha, senhaUserEncrypt).then((bool)=>{
                            if(bool == true)
                            {
                                let token = auth.token(dados);
                                res.status(200).json({msg: "Usuário Logado com sucesso.", error :false, token: token})
                            }else
                            {
                                res.status(401).json({msg: "Usuário Inválido.", error :true, token: null})
                            }
                        }).catch((error)=>{
                            res.status(401).json({msg: "Usuário Inválido.", error :true, token: null})
                       });
                    }
                }
            )
        }else
        {
            res.json({msg: "Usuário Inválido.", error :true, token: null})
        }

        
    },
}
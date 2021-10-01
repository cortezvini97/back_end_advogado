const mysql = require('../DB/db').conection;
var bcryptjs = require('bcryptjs');
const auth = require('../services/auth');

module.exports = {
    listAll: (req, res)=>
    {
        mysql.query(
            "SELECT id, nome, cpf, rg, estado_civil, profissao, cep, estado, cidade, bairro, rua, numero, data_nascimento, telefone, whatsapp, email FROM clientes",
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json(resultado)
            }
        )
    },
    create: async (req, res)=>
    {
        const {nome, cpf, rg, estado_civil, profissao, senha, cep, estado, cidade, bairro, rua,numero, data_nascimento, telefone, whatsapp, email} = req.body;


        const hash = await bcryptjs.hash(senha, 7)

        mysql.query(
            "INSERT INTO clientes(nome, cpf, rg, estado_civil, profissao, hash, cep, estado, cidade, bairro, rua, numero, data_nascimento, telefone, whatsapp, email)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?)",
            [nome, cpf, rg, estado_civil, profissao, hash, cep, estado, cidade, bairro, rua, numero, data_nascimento, telefone, whatsapp, email],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(201).json({msg: "Cliente Cadastrado com Sucesso."})
            }
        )
    },
    getCliente: (req, res)=>
    {
        const {id} = req.params
        mysql.query(
            "SELECT id, nome, cpf, rg, estado_civil, profissao, cep, estado, cidade, bairro, rua, numero, data_nascimento, telefone, whatsapp, email FROM clientes WHERE id = ?",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json(resultado[0])
            }
        )
    },
    getClienteCpf: (req, res)=>
    {
        const {cpf} = req.params
        mysql.query(
            "SELECT id, nome, cpf, rg, estado_civil, profissao, cep, estado, cidade, bairro, rua, numero, data_nascimento, telefone, whatsapp, email FROM clientes WHERE cpf = ?",
            [cpf],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json(resultado[0])
            }
        )
    },
    verefyClienteCpf: (req, res, next)=>
    {
        const {cpf} = req.params;
        mysql.query(
            "SELECT id, nome, cpf, rg, estado_civil, profissao, cep, estado, cidade, bairro, rua, numero FROM clientes WHERE cpf = ?",
            [cpf],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                if(resultado.length > 0)
                {
                    next()
                }else
                {
                    res.status(404).json({error: "Cliente Não Encontrado."})
                }
            }
        )
    },
    verefyCliente: (req, res, next)=>
    {
        const {id} = req.params;

        mysql.query(
            "SELECT id, nome, cpf, rg, estado_civil, profissao, cep, estado, cidade, bairro, rua, numero FROM clientes WHERE id = ?",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                if(resultado.length > 0)
                {
                    next()
                }else
                {
                    res.status(404).json({error: "Cliente Não Encontrado."})
                }
            }
        )
    },
    update: async (req, res)=>
    {
        const {nome, cpf, rg, estado_civil, profissao, senha, cep, estado, cidade, bairro, rua,numero, data_nascimento, telefone, whatsapp, email} = req.body;
        const {id} = req.params

        const hash = await bcryptjs.hash(senha, 7)

        mysql.query(
            "UPDATE clientes SET nome = ?, cpf = ?, rg = ?, estado_civil = ?, profissao = ?, hash = ?, cep = ?, estado = ?, cidade = ?, bairro = ?, rua = ?, numero = ?, data_nascimento = ?, telefone = ?, whatsapp = ?, email = ? WHERE id = ?",
            [nome, cpf, rg, estado_civil, profissao, hash, cep, estado, cidade, bairro, rua, numero, data_nascimento, telefone, whatsapp, email, id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error});
                res.status(200).json({msg: "Cliente Atualizado com Sucesso."});
            }
        )
    },
    delete: (req, res)=>
    {
        const {id} = req.params

        mysql.query(
            "DELETE FROM clientes WHERE id = ?",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error});
                res.status(200).json({msg: "Cliente deletado com sucesso."});
            }
        )
    }
}
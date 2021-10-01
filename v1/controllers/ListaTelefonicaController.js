const mysql = require('../DB/db').conection;
const auth = require('../services/auth');

module.exports = {
    listAll: (req, res)=>
    {
        mysql.query(
            "SELECT * FROM agenda_telefones",
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json(resultado)
            }
        )
    },
    create: (req, res)=>
    {
        const {tipo_lista, nome, numero} = req.body

        mysql.query(
            "INSERT INTO agenda_telefones(tipo_lista, nome, numero)VALUES(?, ?, ?)",
            [tipo_lista, nome, numero],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json({msg: "Telefone adicionado na lista com sucesso"})
            }
        )

    },
    searchTel: (req, res)=>
    {
        const {search} = req.body
        mysql.query(
            "SELECT * FROM agenda_telefones WHERE tipo_lista LIKE ? OR nome LIKE ? OR numero LIKE ?",
            ['%'+search+'%', '%'+search+'%', '%'+search+'%'],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json(resultado)
            }
        )
    },
    getTelefone: (req, res)=>
    {

        const {id} = req.params

        mysql.query(
            "SELECT * FROM agenda_telefones WHERE id = ?",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json(resultado[0])
            }
        )
    },
    verefyTelExists: (req, res, next)=>
    {
        const {id} = req.params
        mysql.query(
            "SELECT * FROM agenda_telefones WHERE id = ?",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                if(resultado.length > 0)
                {
                    next()
                }else
                {
                    res.status(404).json({msg: "Telefone não encontrado."})
                }
            }
        )
    },
    update: (req, res)=>
    {
        const {tipo_lista, nome, numero} = req.body
        const {id} = req.params

        mysql.query(
            "UPDATE agenda_telefones SET tipo_lista = ?, nome = ?, numero = ? WHERE id = ?",
            [tipo_lista, nome, numero, id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json({msg: "Telefone atualizado com sucesso"})
            }
        )
    },
    delete: (req, res)=>
    {
        const {id} = req.params
        mysql.query(
            "DELETE FROM agenda_telefones WHERE id = ?",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json({msg: "Telefone deletado com sucesso"})
            }
        )
    }
}
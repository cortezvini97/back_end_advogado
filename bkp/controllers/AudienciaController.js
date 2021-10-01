const mysql = require('../DB/db').conection;
const auth = require('../services/auth');

module.exports = {
    listAll: (req, res)=>{
        mysql.query(
            "SELECT * FROM audiencias",
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.status(200).json(resultado)
            }
        )
    },
    create: (req, res)=>{
        const {numero_processo_audiencia, data_iniciar, data_final, data_hora_audiencia, contagem_prazo, status} = req.body;

        mysql.query(
            "INSERT INTO audiencias(numero_processo_audiencia, data_iniciar, data_final, data_hora_audiencia, contagem_prazo, status)VALUES(?, ?, ?, ?, ?, ?)",
            [numero_processo_audiencia, data_iniciar, data_final, data_hora_audiencia, contagem_prazo, status],
            (error, resultado, fields)=>{
                if(error) return res.status(500).json({error: error})
                res.json({msg: "Audiência Cadastrado com sucesso."})
            }
        )
    },
    getAudiencia: (req, res)=>{
        const {id} = req.params;
        mysql.query(
            "SELECT * FROM audiencias WHERE id_audiencia = ?",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.json(resultado[0])
            }
        )
    },
    verefyAudiencia: (req, res, next)=>{
        const {id} = req.params;
        mysql.query(
            "SELECT * FROM audiencias WHERE id_audiencia = ?",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                if(resultado.length > 0)
                {
                    next()
                }else
                {
                    res.status(404).json({msg: "Audiência não encontrada"})
                }
            }
        )
    },
    update: (req, res)=>{
        const {id} = req.params;
        const {numero_processo_audiencia, data_iniciar, data_final, data_hora_audiencia, contagem_prazo, status} = req.body;

        mysql.query(
            "UPDATE audiencias SET numero_processo_audiencia = ?, data_iniciar = ?, data_final = ?, data_hora_audiencia = ?, contagem_prazo = ?, status = ? WHERE id_audiencia = ?",
            [numero_processo_audiencia, data_iniciar, data_final, data_hora_audiencia, contagem_prazo, status, id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.json({msg: "Audência atualizado com sucesso."})
            }
        )

    },
    delete: (req, res)=>{
        const {id} = req.params;
        mysql.query(
            "DELETE FROM audiencias WHERE id_audiencia = ?;",
            [id],
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.json({msg: "Audência deletado com sucesso."})
            }
        )
    },
    listAllAudienciasProcessosClientes: (req, res)=>{
        mysql.query(
            "SELECT a.*, b.numero_processo, b.instancia, b.cpf_exequente, c.nome, c.telefone, c.whatsapp, c.email FROM audiencias a INNER JOIN processos b ON a.numero_processo_audiencia = b.numero_processo INNER JOIN clientes c ON b.cpf_exequente = c.cpf;",
            (error, resultado, fields)=>
            {
                if(error) return res.status(500).json({error: error})
                res.json(resultado)
            }
        )
    }
}
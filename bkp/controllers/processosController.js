const mysql = require('../DB/db').conection;
const auth = require('../services/auth');

module.exports = {
    listAll: (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        const token_decode = auth.decodeToken(token)

        if(token_decode.tipo == 1)
        {
            mysql.query(
                "SELECT * FROM processos",
                (error, resultado, fields)=>
                {
                    if(error) return res.status(500).json({error: error})
                    res.status(200).json(resultado)
                }
            )
        }else
        {
            res.status(401).json({
                msg:"Acesso negado",
                data: null
            })
        }
    },
    create: (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        const token_decode = auth.decodeToken(token)

        if(token_decode.tipo == 1)
        {
            mysql.query(
                "INSERT INTO processos(id_cliente, numero_processo, advogado, instancia, tipo_processo, data_inicial, cpf_exequente, executado, movimentacoes, forma_pagamento, valor, ativo)VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [req.body.id_cliente, req.body.numero_processo, req.body.advogado, req.body.instancia, req.body.tipo_processo, req.body.data_inicial, req.body.cpf_exequente, req.body.executado, req.body.movimentacoes, req.body.forma_pagamento, req.body.valor, req.body.ativo],
                (error, resultado, fields)=>
                {
                    if(error) return res.status(500).json({error: error})
                    res.status(201).json({msg: "Processo Cadastrado com sucesso."})
                }
            )
        }else
        {
            res.status(401).json({
                msg:"Acesso negado",
                data: null
            })
        }
    },
    verefyProcesso: (req, res, next)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        const token_decode = auth.decodeToken(token)

        if(token_decode.tipo == 1)
        {
            const {id} = req.params;
            mysql.query(
                "SELECT * FROM processos WHERE id_processo = ?",
                [id],
                (error, resultado, fields)=>
                {
                    if(error)
                    {
                        res.status(500).json({error})
                    }else
                    {
                        (resultado.length > 0) ? next() : res.status(404).json({msg:"Processo Inválido."})
                    }
                }
            )
        }else
        {
            res.status(401).json({
                msg:"Acesso negado",
                data: null
            });
        }
    },
    getProcesso: (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        const token_decode = auth.decodeToken(token)

        if(token_decode.tipo == 1)
        {
            const {id} = req.params;
            mysql.query(
                "SELECT * FROM processos WHERE id_processo = ?",
                [id],
                (error, resultado, fields)=>
                {
                    if(error) return res.status(500).json({error: error})
                    res.status(200).json(resultado[0])
                }
            )
        }else
        {
            res.status(401).json({
                msg:"Acesso negado",
                data: null
            });
        }
    },
    getProcessoCliente: (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        const token_decode = auth.decodeToken(token)

        if(token_decode.tipo == 1)
        {
            const {id} = req.params;
            mysql.query(
                "SELECT * FROM processos a INNER JOIN clientes b ON a.id_cliente = b.id WHERE a.id_processo = ?;",
                [id],
                (error, resultado, fields)=>
                {
                    if(error) return res.status(500).json({error: error})

                    const dados_processo = resultado[0];

                    res.status(200).json({
                        id_processo:dados_processo.id_processo,
                        id_cliente: dados_processo.id,
                        numero_processo: dados_processo.numero_processo,
                        advogado: dados_processo.advogado,
                        instancia: dados_processo.instancia,
                        cpf_exequente: dados_processo.cpf_exequente,
                        executado: dados_processo.executado,
                        movimentacoes: dados_processo.movimentacoes,
                        forma_pagamento: dados_processo.forma_pagamento,
                        tipo_processo: dados_processo.tipo_processo,
                        data_inicial: dados_processo.data_inicial,
                        valor: dados_processo.valor,
                        ativo: dados_processo.ativo,
                        user: {
                            bairro: dados_processo.bairro,
                            cep: dados_processo.cep,
                            cidade: dados_processo.cidade,
                            cpf: dados_processo.cpf,
                            estado: dados_processo.estado,
                            estado_civil: dados_processo.estado_civil,
                            id: dados_processo.id,
                            nome: dados_processo.nome,
                            numero: dados_processo.numero,
                            profissao: dados_processo.profissao,
                            rg: dados_processo.rg,
                            rua: dados_processo.rua
                        }
                    })
                }
            )
        }else
        {
            res.status(401).json({
                msg:"Acesso negado",
                data: null
            });
        }
    },
    update: (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        const token_decode = auth.decodeToken(token)
        if(token_decode.tipo == 1)
        {
            const {id} = req.params;
            mysql.query(
                "UPDATE processos SET id_cliente = ?, numero_processo = ?, advogado = ?, instancia = ?, tipo_processo = ?, data_inicial = ?, cpf_exequente = ?, executado = ?, movimentacoes = ?, forma_pagamento = ?, valor = ?, ativo = ? WHERE id_processo = ?",
                [req.body.id_cliente, req.body.numero_processo, req.body.advogado, req.body.instancia, req.body.tipo_processo, req.body.data_inicial, req.body.cpf_exequente, req.body.executado, req.body.movimentacoes, req.body.forma_pagamento, req.body.valor, req.body.ativo, id],
                (error, resultado, fields)=>
                {
                    if(error) return res.status(500).json({error: error})
                    res.status(201).json({msg: "Processo Atualizado com sucesso."})
                }
            )
        }else
        {
            res.status(401).json({
                msg:"Acesso negado",
                data: null
            });
        }
    },
    delete: (req, res)=>
    {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        const token_decode = auth.decodeToken(token)

        if(token_decode.tipo == 1)
        {
            const {id} = req.params;
            mysql.query(
                "DELETE FROM processos WHERE id_processo = ?;",
                [id],
                (error, resultado, fields)=>
                {
                    if(error)
                    {
                        res.status(500).json(error)
                    }
                    res.status(200).json({msg:"Processo deletado com sucesso."})
                }
            )
        }else
        {
            res.status(401).json({
                msg:"Acesso negado",
                data: null
            });
        }
    }
}
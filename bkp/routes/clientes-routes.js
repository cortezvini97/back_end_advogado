const express = require('express');
const controller = require('../controllers/ClienteController.js');
const auth = require('../services/auth');

const clientesRoutes = express.Router();

clientesRoutes.get('/', auth.authorize, controller.listAll);
clientesRoutes.post('/', auth.authorize, controller.create);
clientesRoutes.get('/:id', auth.authorize, controller.verefyCliente, controller.getCliente);
clientesRoutes.get('/getclientcpf/:cpf', auth.authorize, controller.verefyClienteCpf ,controller.getClienteCpf);
clientesRoutes.put('/:id', auth.authorize, controller.verefyCliente, controller.update);
clientesRoutes.delete('/:id', auth.authorize, controller.verefyCliente, controller.delete);

module.exports = clientesRoutes;
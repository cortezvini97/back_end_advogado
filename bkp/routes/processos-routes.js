const express = require('express');
const controller = require('../controllers/processosController.js');
const auth = require('../services/auth');

const processosRoutes = express.Router();

processosRoutes.get('/', auth.authorize, controller.listAll);
processosRoutes.post('/', auth.authorize, controller.create);
processosRoutes.get('/:id', auth.authorize, controller.verefyProcesso, controller.getProcesso);
processosRoutes.get('/getProcessoCliente/:id', auth.authorize, controller.verefyProcesso, controller.getProcessoCliente);
processosRoutes.put('/:id', auth.authorize, controller.verefyProcesso, controller.update);
processosRoutes.delete('/:id', auth.authorize, controller.verefyProcesso, controller.delete);
module.exports = processosRoutes;
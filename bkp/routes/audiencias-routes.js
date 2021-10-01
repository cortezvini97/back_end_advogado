const express = require('express');
const controller = require('../controllers/AudienciaController.js');
const auth = require('../services/auth');

const audienciaRoutes = express.Router();

audienciaRoutes.get("/", auth.authorize, controller.listAll);
audienciaRoutes.post('/', auth.authorize, controller.create);
audienciaRoutes.get('/:id', auth.authorize, controller.verefyAudiencia, controller.getAudiencia);
audienciaRoutes.put('/:id', auth.authorize, controller.verefyAudiencia, controller.update);
audienciaRoutes.delete('/:id', auth.authorize, controller.verefyAudiencia, controller.delete);
audienciaRoutes.get('/listAll/processosaudienciasclientes', auth.authorize, controller.listAllAudienciasProcessosClientes);

module.exports = audienciaRoutes
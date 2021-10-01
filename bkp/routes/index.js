const express = require('express');
const usersRoutes = require('./users-routes');
const clientesRoutes = require('./clientes-routes');
const processosRoutes = require('./processos-routes');
const audienciaRoutes = require('./audiencias-routes');
const mailRoute = require('./mail-route');
const routes = express.Router();

routes.use('/users', usersRoutes)
routes.use('/clientes', clientesRoutes);
routes.use('/processos', processosRoutes);
routes.use('/audiencias', audienciaRoutes);
routes.use('/mail', mailRoute);

module.exports = routes;
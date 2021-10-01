const express = require('express');
const controller = require('../controllers/User')
const auth = require('../services/auth');
const usersRoutes = express.Router();


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

usersRoutes.get('/', auth.authorize ,controller.listAll);
usersRoutes.post('/', auth.authorize, controller.create);
usersRoutes.get('/:id', auth.authorize, controller.verifyUser ,controller.getUser);
usersRoutes.put('/:id', auth.authorize, controller.verifyUser ,controller.update);
usersRoutes.delete('/:id', auth.authorize, controller.verifyUser, controller.delete)
usersRoutes.post('/login', controller.login);


module.exports = usersRoutes;
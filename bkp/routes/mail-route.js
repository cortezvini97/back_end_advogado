const express = require('express');
const controller = require('../controllers/mailController');
const auth = require('../services/auth');

const mailRoute = express.Router();

mailRoute.post('/', auth.authorize, controller.sendMail);

module.exports = mailRoute;
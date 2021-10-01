const express = require('express');
const controller = require('../controllers/ListaTelefonicaController')
const auth = require("../services/auth");

const ListaTelefone = express.Router();

ListaTelefone.get("/", auth.authorize, controller.listAll);
ListaTelefone.post("/", auth.authorize, controller.create);
ListaTelefone.post('/search', auth.authorize, controller.searchTel);
ListaTelefone.get("/:id", auth.authorize, controller.verefyTelExists, controller.getTelefone);
ListaTelefone.put("/:id", auth.authorize, controller.verefyTelExists, controller.update);
ListaTelefone.delete("/:id", auth.authorize, controller.verefyTelExists, controller.delete);
module.exports = ListaTelefone;
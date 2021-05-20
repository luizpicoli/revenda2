const express = require("express");
const routes = express.Router()

const CarroController = require("./controllers/CarroController");
const UsuarioController = require("./controllers/UsuarioController");
const login = require("./middleware/login")

routes.get("/carros", CarroController.index)
      .post("/carros", login, CarroController.store);

routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", UsuarioController.store)
      .post("/login", UsuarioController.login);

module.exports = routes;
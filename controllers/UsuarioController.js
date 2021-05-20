const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const knex = require("../database/dbConfig");

module.exports = {
  async index(req, res) {
    const usuarios = await knex("usuarios");
    res.status(200).json(usuarios);
  },

  async store(req, res) {
    // faz a desestruturação do objeto req.body
    const { nome, email, senha } = req.body;

    // validação para os campos
    if (!nome || !email || !senha) {
      res.status(400).json({ erro: "Enviar nome, email, senha do usuário" });
      return;
    }

    // verifica se o e-mail já está cadastrado
    try {
      const dados = await knex("usuarios").where({ email });
      // if (dados.length == 1)
      if (dados.length) {
        res.status(400).json({ erro: "E-mail já Cadastrado" });
        return;
      }
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }

    // joao123  => $2b$10$cRtZGcR8RUEYKJS4vicKWumxplon4gaU5G9uTih3kEGQ4YLwzA3oC

    // gera um hash da senha a ser salvo no banco
    const hash = bcrypt.hashSync(senha, 10);

    try {
      const novo = await knex("usuarios").insert({ nome, email, senha: hash });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async login(req, res) {
    // faz a desestruturação do objeto req.body
    const { email, senha } = req.body;

    // validação para os campos
    if (!email || !senha) {
      //      res.status(400).json({ erro: "Enviar email, senha do usuário" });
      res.status(400).json({ erro: "Login ou senha incorretos" });
      return;
    }

    // verifica se o e-mail já está cadastrado
    try {
      const dados = await knex("usuarios").where({ email });
      if (dados.length == 0) {
        //        res.status(400).json({ erro: "E-mail inválido" });
        res.status(400).json({ erro: "Login ou senha incorretos" });
        return;
      }

      if (bcrypt.compareSync(senha, dados[0].senha)) {
        
        const token = jwt.sign({
          usuario_id: dados[0].id,
          usuario_nome: dados[0].nome
        }, process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
        )

        res.status(200).json({ msg: "Ok! Acesso Liberado", token });
      } else {
        //res.status(400).json({ erro: "Senha Incorreta" });
        res.status(400).json({ erro: "Login ou senha incorretos" });
      }
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },
};

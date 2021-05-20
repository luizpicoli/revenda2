const knex = require("../database/dbConfig");

module.exports = {
  // index: listagem
  // store/create: inclusão
  // update: alteração
  // show: retornar 1 registro
  // destroy: exclusão

  async index(req, res) {
    //const carros = await knex("carros").orderBy("id", "desc");
    
    // const carros = await knex("carros")
    //    .join("marcas", "carros.marca_id", "=", "marcas.id")
    //    .orderBy("carros.id", "desc");

    const carros = await knex
      .select("c.id", "c.modelo", "m.nome as marca", "c.ano", "c.preco", "c.foto")
      .from("carros as c")
      .leftJoin("marcas as m", "c.marca_id", "m.id")
      .orderBy("c.id", "desc");

    res.status(200).json(carros);
  },

  async store(req, res) {
    // faz a desestruturação do objeto req.body
    const { modelo, marca_id, ano, preco, foto } = req.body;

    // validação para os campos
    if (!modelo || !marca_id || !ano || !preco || !foto) {
      res.status(400).json({ erro: "Enviar modelo, marca_id, ano, preco e foto do veículo" });
      return;
    }

    try {
      const novo = await knex("carros").insert({ modelo, marca_id, ano, preco, foto });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },
};

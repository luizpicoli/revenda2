
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('carros').del()
    .then(function () {
      // Inserts seed entries
      return knex('carros').insert([
        { modelo: "Palio", marca_id: 2, ano: 2018, preco: 32500, foto: "http://www.rastreadores.org/wp-content/uploads/2018/11/rastreadores-palio.jpg" },
        { modelo: "Sandero", marca_id: 1, ano: 2017, preco: 37100, foto: "https://i.ytimg.com/vi/WURsO4LKgfI/maxresdefault.jpg" },
        { modelo: "HB20", marca_id: 8, ano: 2019, preco: 45900, foto: "https://www.autossegredos.com.br/wp-content/uploads/2018/09/teste-hyundai-hb20-2019-23.jpg" }
      ]);
    });
};

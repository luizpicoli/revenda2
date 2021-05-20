
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('marcas').del()
    .then(function () {
      // Inserts seed entries
      return knex('marcas').insert([
        {nome: 'Renault'},
        {nome: 'Fiat'},
        {nome: 'Chevrolet'},
        {nome: 'Ford'},
        {nome: 'Volkswagen'},
        {nome: 'Peugeot'},
        {nome: 'Honda'},
        {nome: 'Hyundai'},
        {nome: 'Citroen'}
      ]);
    });
};

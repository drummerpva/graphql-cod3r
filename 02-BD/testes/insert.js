const db = require('../config/db');

/* const novoPerfil = {
  nome: 'visitante',
  rotulo: 'Visitante',
};

db('perfis')
  .insert(novoPerfil)
  .then(res => console.log(res))
  .catch(err => console.log(err.sqlMessage))
  .finally(() => db.destroy()); */

const perfilSU = {
  nome: 'root' + Math.random(),
  rotulo: 'Super Usuário',
};

db.insert(perfilSU)
  .into('perfis')
  .then(res => res[0])
  .then(id => `O código gerado foi ${id}`)
  .then(str => console.log(str))
  .catch(err => console.log(err.sqlMessage))
  .finally(() => db.destroy());

const { perfis } = require('../data/db');

module.exports = {
  salario: usuario => {
    return usuario.salario_real;
  },
  perfil: usuario => {
    return perfis.filter(p => p.id == usuario.perfil_id)[0] || null;
  },
};

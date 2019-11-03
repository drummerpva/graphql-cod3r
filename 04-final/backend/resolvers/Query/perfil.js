const db = require('../../config/db');

module.exports = {
  perfis(_, __, ctx) {
    ctx && ctx.validarAdmin();
    return db('perfis').select();
  },
  perfil(_, { filtro }, ctx) {
    ctx && ctx.validarAdmin();
    return filtro.id
      ? db('perfis')
          .select()
          .where({ id: filtro.id })
          .first()
      : filtro.nome
      ? db('perfis')
          .select()
          .where({ nome: filtro.nome })
          .first()
      : null;
  },
};

const db = require('../../config/db');

module.exports = {
  perfis() {
    return db('perfis').select();
  },
  perfil(_, { filtro }) {
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

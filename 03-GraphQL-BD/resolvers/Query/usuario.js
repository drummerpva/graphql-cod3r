const db = require('../../config/db');

module.exports = {
  usuarios() {
    return db('usuarios').select();
  },
  usuario(_, { filtro }) {
    return filtro.id
      ? db('usuarios')
          .select()
          .where({ id: filtro.id })
          .first()
      : filtro.email
      ? db('usuarios')
          .select()
          .where({ email: filtro.email })
          .first()
      : null;
  },
};

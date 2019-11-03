const db = require('../../config/db');

module.exports = {
  usuarios(perfil) {
    return db('usuarios')
      .join('usuario_perfil', 'usuarios.id', 'usuario_perfil.usuario_id')
      .where({ perfil_id: perfil.id });
  },
};

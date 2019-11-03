const { usuarios } = require('../data/db');

module.exports = {
  usuarios: perfil => {
    return usuarios.filter(u => u.perfil_id == perfil.id);
  },
};

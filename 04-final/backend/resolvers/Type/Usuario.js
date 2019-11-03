const db = require('../../config/db');

module.exports = {
  perfis(usuario) {
    return db('perfis')
      .join('usuario_perfil', 'perfis.id', 'usuario_perfil.perfil_id')
      .where({ usuario_id: usuario.id });
    // const temp = await db('usuario_perfil')
    //   .select()
    //   .where({ usuario_id: usuario.id });
    // let ids = [];
    // for (id of temp) ids.push(id.perfil_id);
    // return await db('perfis')
    //   .select()
    //   .whereIn('id', ids);
  },
};

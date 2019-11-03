const db = require('../../config/db');
const bcrypt = require('bcrypt-nodejs');
const { getUsuarioLogado } = require('../comum/usuario');

module.exports = {
  login: async (_, { dados }) => {
    const usuario = await db('usuarios')
      .where({ email: dados.email })
      .first();
    if (!usuario) throw new Error('Usuário/Senha inválidos');
    const saoIguais = bcrypt.compareSync(dados.senha, usuario.senha);
    if (!saoIguais) throw new Error('Usuário/Senha inválidos');
    return getUsuarioLogado(usuario);
  },
  usuarios(_, __, ctx) {
    ctx && ctx.validarAdmin();
    return db('usuarios').select();
  },
  usuario(_, { filtro }, ctx) {
    ctx && ctx.validarUsuarioFiltro(filtro);
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

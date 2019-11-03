const db = require('../../config/db');
const { usuario: obterUsuario } = require('../Query/usuario');
const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoUsuario(_, { dados }) {
    try {
      const existe = await db('usuarios')
        .where({ email: dados.email })
        .first();
      if (existe) throw new Error('E-mail já cadastrado, tente novamente');
      const { nome, email, senha } = dados;
      const [id] = await db('usuarios').insert({ nome, email, senha });
      if (dados.perfis) {
        for (filtro of dados.perfis) {
          let temp = await obterPerfil(null, { filtro });
          if (temp)
            await db('usuario_perfil').insert({
              usuario_id: id,
              perfil_id: temp.id,
            });
          temp = null;
        }
      }
      return await db('usuarios')
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  },
  async excluirUsuario(_, { filtro }) {
    try {
      const user = await obterUsuario(null, { filtro });
      if (user) {
        await db('usuario_perfil')
          .delete()
          .where({ usuario_id: user.id });
        await db('usuarios')
          .delete()
          .where({ id: user.id });
        return user;
      } else {
        throw new Error('Usuário não existe!');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarUsuario(_, { filtro, dados }) {
    const bdUser = await obterUsuario(null, { filtro });
    if (!bdUser) throw new Error('Usuário não existe');
    if (
      dados.email &&
      !(dados.email === bdUser.email) &&
      (await db('usuarios')
        .where({ email: dados.email })
        .first())
    )
      throw new Error(`O e-mail '${dados.email}' já esta sendo usado`);
    await db('usuarios')
      .where({ id: bdUser.id })
      .update({
        nome: dados.nome || bdUser.nome,
        email: dados.email || bdUser.email,
      });
    if (dados.senha)
      await db('usuarios')
        .where({ id: bdUser.id })
        .update({ senha: dados.senha });
    if (dados.perfis) {
      await db('usuario_perfil')
        .where({ usuario_id: bdUser.id })
        .delete();
      for (perfil of dados.perfis) {
        let temp = await obterPerfil(null, { filtro: perfil });
        console.log(bdUser.id);
        temp &&
          (await db('usuario_perfil').insert({
            usuario_id: bdUser.id,
            perfil_id: temp.id,
          }));
        temp = null;
      }
    }
    return db('usuarios')
      .where({ id: bdUser.id })
      .first();
  },
};

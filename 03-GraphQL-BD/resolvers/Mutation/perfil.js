const db = require('../../config/db');
const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  async novoPerfil(_, { dados }) {
    let verifica = await db('perfis')
      .select()
      .where({ nome: dados.nome })
      .first();
    if (verifica) throw new Error('Perfil de nome já cadastrado!');
    try {
      const [id] = await db('perfis').insert(dados);
      return db('perfis')
        .where({ id })
        .first();
    } catch (error) {
      throw new Error(error.sqlMessage);
    }
  },
  async excluirPerfil(_, { filtro }) {
    // let temp = filtro.id
    //   ? await db('perfis')
    //       .select()
    //       .where({ id: filtro.id })
    //       .first()
    //   : await db('perfis')
    //       .select()
    //       .where({ nome: filtro.nome })
    //       .first();
    try {
      const perfil = await obterPerfil(null, { filtro });
      if (!perfil) throw new Error('Perfil não cadastrado!');
      await db('usuario_perfil')
        .where({ perfil_id: perfil.id })
        .delete();
      await db('perfis')
        .where({ id: perfil.id })
        .delete();
      return perfil;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async alterarPerfil(_, { filtro, dados }) {
    try {
      const perfil = await obterPerfil(null, { filtro });
      if (!perfil) throw new Error('Perfil não existe');
      console.log(perfil.nome);
      console.log(dados.nome);

      if (
        dados.nome &&
        (await db('perfis')
          .where({ nome: dados.nome })
          .first())
      )
        throw new Error(`Perfil com nome '${dados.nome}' já cadastrado`);
      await db('perfis')
        .where({ id: perfil.id })
        .update(dados);
      return { ...perfil, ...dados };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

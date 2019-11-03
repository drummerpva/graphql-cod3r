const db = require('../config/db');

const salvarUsuario = async (nome, email, senha) => {
  const { qtd } = await db('usuarios')
    .count('* as qtd')
    .where({ email })
    .first();
  if (qtd > 0) {
    await db('usuarios')
      .update({ nome, email, senha })
      .where({ email });
    return await db('usuarios')
      .select()
      .where({ email })
      .first();
  }
  const id = await db('usuarios').insert({ nome, email, senha });

  return await db('usuarios')
    .select()
    .where({ id: id[0] })
    .first();
};

const salvarPerfil = async (nome, rotulo) => {
  const { qtd } = await db('perfis')
    .count('* as qtd')
    .where({ nome })
    .first();
  if (qtd > 0) {
    return await db('perfis')
      .select()
      .where({ nome })
      .first();
  }
  const id = await db('perfis').insert({ nome, rotulo });

  return await db('perfis')
    .select()
    .where({ id: id[0] })
    .first();
};

const adicionarPerfis = async (usuario, ...perfis) => {
  const usuario_id = usuario.id;
  await db('usuarios_perfis')
    .where({ usuario_id })
    .delete();

  for (perfil of perfis) {
    let { qtd } = await db('usuarios_perfis')
      .count('* as qtd')
      .where({ usuario_id: usuario.id, perfil_id: perfil.id })
      .first();
    if (qtd === 0) {
      await db('usuarios_perfis').insert({
        usuario_id: usuario.id,
        perfil_id: perfil.id,
      });
    }
  }
};

const executar = async () => {
  const usuario = await salvarUsuario(
    'Douglas Poma',
    'douglaspoma@yahoo.com',
    '123456'
  );
  const perfilA = await salvarPerfil('rh', 'Pessoal');
  const perfilB = await salvarPerfil('fin', 'Financeiro');

  console.log(usuario);
  console.log(perfilA);
  console.log(perfilB);

  await adicionarPerfis(usuario, perfilA, perfilB);
};

executar()
  .catch(err => console.log(err))
  .finally(() => db.destroy());

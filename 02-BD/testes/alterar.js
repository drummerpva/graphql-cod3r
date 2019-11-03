const db = require('../config/db');

const novoUsuario = {
  nome: 'Douglas Poma',
  email: 'douglaspoma@yahoo.com',
  senha: '123456',
};

const exercicio = async () => {
  const { qtd } = await db('usuarios')
    .count('* as qtd')
    .first();

  //inserir se a tabela estiver vazia
  if (qtd === 0) {
    await db('usuarios').insert(novoUsuario);
  }

  //consultar
  let { id } = await db('usuarios')
    .select('id')
    .limit(1)
    .first();

  //alterar
  await db('usuarios')
    .where({ id })
    .update({
      nome: 'Douglas S Poma Alterado',
      email: 'douglas.poma@registrallogistica.com.br',
    });

  return await db('usuarios').where({ id });
};

exercicio()
  .then(usuario => console.log(usuario))
  .finally(() => db.destroy());

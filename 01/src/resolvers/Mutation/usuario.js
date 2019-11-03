const { usuarios, proximoId } = require('../../data/db');

const indiceUsuario = filtro => {
  if (!filtro) return -1;
  if (filtro.id) return usuarios.findIndex(u => u.id === filtro.id);
  if (filtro.email) return usuarios.findIndex(u => u.email === filtro.email);
  return -1;
};

module.exports = {
  novoUsuario: (_, { dados }) => {
    const emailExistente = usuarios.some(u => u.email === dados.email);
    if (emailExistente) throw new Error('E-mail cadastrado');
    const novo = {
      id: proximoId(),
      ...dados,
      perfil_id: 1,
      status: 'ATIVO',
    };
    usuarios.push(novo);
    return novo;
  },
  excluirUsuario: (_, { filtro }) => {
    const i = indiceUsuario(filtro);
    if (i < 0) return null;
    const excluidos = usuarios.splice(i, 1);
    return excluidos ? excluidos[0] : null;
  },
  alterarUsuario: (_, { filtro, dados }) => {
    const i = indiceUsuario(filtro);
    if (i < 0) return null;

    usuarios.splice(i, 1, { ...usuarios[i], ...dados });

    return usuarios[i];

    // usuarios[i].nome = args.nome || usuarios[i].nome;
    // usuarios[i].email = args.email || usuarios[i].email;
    // usuarios[i].idade = args.idade || usuarios[i].idade;
    // return usuarios[i];

    // const usuario = {
    //   ...usuarios[i],
    //   ...args,
    // };
    // usuarios.splice(i, 1, usuario);
    //return usuario;
  },
};

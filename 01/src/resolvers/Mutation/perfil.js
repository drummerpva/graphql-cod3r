const { perfis, proximoId } = require('../../data/db');

const indicePerfil = filtro => {
  if (!filtro) return -1;
  if (filtro) return perfis.findIndex(p => p.id === parseInt(filtro));
  return -1;
};
module.exports = {
  novoPerfil: (_, { nome }) => {
    const id = proximoId();
    if (nome) perfis.push({ id, nome });
    const i = indicePerfil(id);
    return perfis[i];
  },
  excluirPerfil: (_, { id }) => {
    const i = indicePerfil(id);
    return i < 0 ? null : perfis.splice(i, 1)[0];
  },
  alterarPerfil: (_, { id, nome }) => {
    const i = indicePerfil(id);
    if (i < 0) return null;
    perfis.splice(i, 1, { ...perfis[i], nome });
    return perfis[i];
  },
};

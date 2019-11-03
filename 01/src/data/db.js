let id = 1;
const proximoId = () => {
  return id++;
};

const usuarios = [
  {
    id: proximoId(),
    nome: 'Douglas Poma',
    email: 'douglaspoma@yahoo.com',
    idade: '99',
    perfil_id: 2,
    status: 'ATIVO',
  },
  {
    id: proximoId(),
    nome: 'Elaine Regina dos Santos',
    email: 'elainasantos@gmail.com',
    idade: '120',
    perfil_id: 1,
    status: 'ATIVO',
  },
  {
    id: proximoId(),
    nome: 'Oswald Rabetinéio',
    email: 'miau@auau.com',
    idade: '20',
    perfil_id: 1,
    status: 'INATIVO',
  },
];

const perfis = [
  {
    id: 1,
    nome: 'Comum',
  },
  {
    id: 2,
    nome: 'Administrador',
  },
];

module.exports = { usuarios, perfis, proximoId };

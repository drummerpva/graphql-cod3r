const jwt = require('jwt-simple');
const { perfis: obterPerfis } = require('../Type/Usuario');

module.exports = {
  getUsuarioLogado: async usuario => {
    const perfis = await obterPerfis(usuario);
    const agora = Math.floor(Date.now() / 1000);

    const usuairoInfo = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfis: perfis.map(p => p.nome),
      iat: agora,
      exp: agora + 3 * 24 * 60 * 60,
    };

    const authSecret = process.env.APP_AUTH_SECRET;

    return {
      ...usuairoInfo,
      token: jwt.encode(usuairoInfo, authSecret),
    };
  },
};

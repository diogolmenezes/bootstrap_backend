const authentication = require('../../config/authentication');
const server = require('../../config/restify').server;
const controller = require('./controller');
const route = require('../../config/route');

// Através do objeto info obtemos informações que nos possibilitam ser flexiveis para criar rotas mais elegantes e significativas:
// { base: '/minha-aplicacao', module: 'fatura', full: '/minha-aplicacao/fatura' }
const info = route.info(__filename);

// curl -X 'GET' localhost:3000/minha-aplicacao/cliente/1/fatura/12/2017
server.get(`${info.base}/cliente/:id/${info.module}/:mes/:ano`, controller.carregar.bind(controller));

// Exemplos:
//
// Rota Versionada: /minha-aplicacao/cliente/1/fatura 
// curl -s -H 'accept-version: ~2' localhost:3000/minha-aplicacao/cliente/1/fatura 
// server.post({ path: `${info.base}/cliente/:id/${info.module}`, version: '2.0.1' }, controller.carregarV2.bind(controller));
//
// Rota Autenticada:
// curl -H 'Authorization: Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImxvZ2luIjoiZGlvZ28ubGVpdGFvQG9pLm5ldC5iciIsInBlcmZpbCI6ImFkbWluIn0sImlhdCI6MTUxMDQ1NTg3MX0.q8ZxxZ893JGi490N0FAFrFAaNNl6TDloagprfMBUDNo' -X 'GET' localhost:3000/rota-autenticada
// curl -H 'Authorization: Baerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImxvZ2luIjoiZGlvZ28ubGVpdGFvQG9pLm5ldC5iciIsInBlcmZpbCI6ImFkbWluIn0sImlhdCI6MTUxMDQ1NjMxMCwiZXhwIjoxNTEwNDU2MzIwfQ.E861Vz01xqNCf0-vuLGEH6LVy_P4qGP41-rTmDrOARE' -X 'GET' localhost:3000/rota-autenticada
// curl -X 'GET' localhost:3000/rota-autenticada
// server.get('/rota-autenticada', authentication.protect.bind(authentication), function (req, res, next) {
//     res.send('Funciona!');
//     console.log(req.user);
//     return next();
// });



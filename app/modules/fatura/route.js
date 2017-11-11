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
// Rota: /minha-aplicacao/cliente/1/fatura 
// curl -X 'POST' -H 'Content-Type: application/json' localhost:3000/minha-aplicacao/cliente/1/fatura -d '{ valor: 24.31 }'
// server.post(`${info.base}/cliente/:id/${info.module}`, controller.excluir.bind(controller));
//
// Rota: /minha-aplicacao/fatura/1
// curl -I -X 'DELETE' localhost:3000/minha-aplicacao/fatura/1
// server.del(`${info.full}/:id`, controller.excluir.bind(controller));
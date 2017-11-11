const server = require('../../config/restify').server;
const controller = require('./controller');
const util = require('../../util');
const route = require('../../config/route');
const info = route.info(__filename);

// através do objeto info obtemos informações que nos possibilitam ser flexiveis para criar rotas mais elegantes e significativas:
// info.base => /minha-aplicacao
// info.module => fatura
// info.full => /minha-aplicacao/fatura

// curl -IX 'DELETE' localhost:3000/minha-aplicacao/fatura/1
server.del(`${info.full}/:id`, controller.excluir.bind(controller));

// nesse exemplo, começamos a rota por cliente deixando claro que queremos a fatura de dezembro do cliente x
// curl localhost:3000/minha-aplicacao/cliente/1/fatura/12/2017
server.get(`${info.base}/cliente/:id/${info.module}/:mes/:ano`, controller.carregar.bind(controller));

// curl -H 'Content-Type: application/json' -X 'POST' localhost:3000/minha-aplicacao/teste -d '{ "teste": 1 }'
server.post(`${info.base}/teste`, function (req, res, next) {
    req.log.info({ tempo: 25 }, 'Testeeeeeee')


    let logger = require('../../config/log')('Fatura');
    let c = { nome: 'diogo' }

    logger.debug('Mensagem');
    logger.debug('Mensagem', c);
    logger.debug('mensagem', { natural: c });
    logger.debug('mensagem', { natural: c, pretty: c });


    res.send('ok' + req.body.teste)
    next();
})
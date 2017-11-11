const config = require('./app/config');
const server = require('./app/config/restify').server;
const route = require('./app/config/route');
const util = require('./app/util');

// iniciando o servidor web
server.listen(config.app.port, () => {
    util.display(`A aplicação está rodando em modo [${config.app.env}] na porta [${config.app.port}].`);

    // importando as rotas de todos os modulos da aplicação contidos na pasta modules
    route.importModuleRoutes();
});

// rota de health check
server.get('/', (req, res, next) => {
    res.send(`${config.app.name} está rodando.`);
    next();
});

//TODO: configurar erros
server.on('InternalServer', function (req, res, err, callback) {
    // this will get fired first, as it's the most relevant listener
    return callback();
});

server.on('restifyError', function (req, res, err, callback) {
    // this is fired second.
    return callback();
});
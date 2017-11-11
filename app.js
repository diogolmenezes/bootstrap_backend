const config = require('./app/config');
const server = require('./app/config/restify').server;
const route = require('./app/config/route');
const util = require('./app/util');
const database = require('./app/config/database');
const logger = require('./app/config/log')();
const applicationErrors = require('./app/config/errors');

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

// repassa todos os erros para o handler padrão da aplicação
server.on('restifyError', applicationErrors.handle.bind(applicationErrors));

// finaliza a conexão com o banco sempre que o restify for finalizado
server.on('close', () => {
    util.display(`O Servidor do restify foi finalizado.`);
    database.connection.close();
});

process.on('SIGINT', function () {
    server.close();
});

module.exports = server;
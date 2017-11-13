// Classe responsavel por criar e configurar a instância do restify
// A documentação do restify pode ser encontrada em http://restify.com/
class RestifyConfig {
    constructor() {
        this.config = require('../config');
        this.restify = require('restify');
        this.server = null;
        this.logger = require('./log')();
    }

    configure() {

        this.server = this.restify.createServer({
            log: this.logger.bunyanLogger
        });

        this.applyMiddlewares();

        return this.server;

    }

    // use este método para incluir seus middlewares e plugins, cuidado 
    // com a ordem de inclusão, isso pode quebrar o fluxo de execução.
    // http://restify.com/docs/plugins-api/
    applyMiddlewares() {

        this.server.use(this.restify.plugins.acceptParser(this.server.acceptable));
        this.server.use(this.restify.plugins.authorizationParser());
        this.server.use(this.restify.plugins.gzipResponse());
        this.server.use(this.restify.plugins.queryParser());
        this.server.use(this.restify.plugins.bodyParser());

        // controle de rate limit
        this.server.use(this.restify.plugins.throttle({
            burst: 10,  // requests concorrentes no máximo
            rate: 0.5,  // 1 request / 2 segundos
            ip: true
            // inativando o ratelimit para um IP qualquer
            // ,overrides: {
            //     '192.168.1.1': {
            //         rate: 0,        // unlimited
            //         burst: 0
            //     }
            // }
        }));

        // habilitando o logs do request e do response
        require('./plugins/request-logger')(this.server).configure();
    }
}

const restifyConfig = new RestifyConfig();

// devolve uma instancia do config e outra do server.
module.exports = {
    restifyConfig,
    server: restifyConfig.configure()
}
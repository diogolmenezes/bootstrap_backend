// Classe responsavel por criar e configurar a instância do restify
// A documentação do restify pode ser encontrada em http://restify.com/
class RestifyConfig {
    constructor() {
        this.config = require('../config');
        this.restify = require('restify');
        this.server = null;
        this.logger = require('./log')({ module: 'Restify' });
        this.origin = require('./plugins/origin');
    }

    configure() {

        this.server = this.restify.createServer({
            log: this.logger
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
        this.server.use(this.restify.plugins.requestLogger());
        this.server.use(this.restify.plugins.throttle({ burst: 10, rate: 0.5, ip: true }));

        // habilitando o plugin de origem
        this.server.use(this.origin.proccess.bind(this.origin));

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
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

    // enrichRequest() {
    //     this.server.pre((req, res, next) => {
    //         console.log('ID =>', req.id());

    //         req.module = 

    //         next();
    //     });
    // }

    applyMiddlewares() {

        this.server.use(this.restify.plugins.bodyParser());

        this.server.on('after', this.restify.plugins.auditLogger({
            log: this.logger.bunyanLogger,
            event: 'after',
            server: this.server,
            logMetrics: 'logBuffer'
        }));
    }
}

const restifyConfig = new RestifyConfig();

// devolve uma instancia do config e outra do server.
module.exports = {
    restifyConfig,
    server: restifyConfig.configure()
}
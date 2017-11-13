class Audit {

    constructor() {
        this.bunyan = require('bunyan');
        this.config = require('../config');
        this.logger = this.bunyan.createLogger(this.config.audit.bunyan);
    }

    configure() {

        const restifyConfig = require('../config/restify').restifyConfig;

        restifyConfig.server.on('after', restifyConfig.restify.plugins.auditLogger({
            server: restifyConfig.server,
            event: 'after',
            log: this.logger,
            context: this.run,
            printLog: this.config.audit.printLog
        }));
    }

    // esse método é chamado todas as vezes que um hit de auditoria é gerado    
    run(req, res, route, err) {
        // caso você queira persistir esse retorno altere esse método
        console.log('A auditoria funciona!');
    }
}

module.exports = new Audit();
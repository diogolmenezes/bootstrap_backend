// Essa classe é responsável por configurar os logs dos requests e dos responses 
// utilizando o logger padrão definido na criação do server do restify.
class RequestAndResponseLogger {

    constructor(server) {
        this.server = server;
    }

    configure() {
        this.server.use(this.request);
        this.server.on('after', this.response);
    }

    request(req, res, next) {
        let request = `REQUEST ${req.id()} - ${req.method} ${req.url} - Body [${JSON.stringify(req.body)}] - Header [${JSON.stringify(req.headers)}]`;
        req.log.debug(request);
        return next();
    }

    response(req, res, route, err) {
        let { versions } = route ? route.spec : '';
        let response = `RESPONSE ${req.id()} - ${req.method} ${req.url} - Version [${versions}] - Status ${res.statusCode} Body [${res._data}] Header [${res._header}]`;
        req.log.debug(response);
    }
}

module.exports = (server) => {
    return new RequestAndResponseLogger(server);
}
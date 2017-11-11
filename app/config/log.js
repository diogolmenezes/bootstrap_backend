
class Log {
    constructor({ bunyanLogger, module }) {
        this.os = require('os');
        this.config = require('../config');
        this.pretty = require('pretty-format');
        this.bunyan = require('bunyan');
        this.config.log.bunyan.streams[0].path = this.config.log.bunyan.streams[0].path.replace('{hostname}', this.os.hostname());
        this.bunyanLogger = bunyanLogger || this.bunyan.createLogger(this.config.log.bunyan);
        this.module = module || this.config.app.name;
    }

    debug(msg, obj) {
        this.write({
            msg,
            obj,
            type: 'debug'
        });
    }

    write({ type, module = this.module, msg, obj }) {

        // INFO: a diferença entre as propriedades obj e objPretty é que o objPretty é salvo como string e o obj é salvo como json.
        // Salvar como string evita problemas de 2 colunas com o mesmo nome mas com tipos diferentes na hora da criação do indice no elasticsearch.

        if (obj) {
            if (!obj.natural)
                obj = { aux: this.pretty(obj) };
            else {
                if (obj.pretty)
                    obj = { natural: obj.natural, aux: this.pretty(obj.pretty) };
                else
                    obj = { natural: obj.natural };
            }
            this.bunyanLogger[type](obj, `${this.module} => ${msg}`);
        }
        else
            this.bunyanLogger[type](`${this.module} => ${msg}`);

    }
}

module.exports = function (options = {}) {
    return new Log(options);
}
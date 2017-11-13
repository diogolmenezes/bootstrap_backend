// Classe responsável por gerenciar e prover logs para a aplicação
class Log {
    constructor({ bunyanLogger, module }) {
        this.os = require('os');
        this.config = require('../config');
        this.pretty = require('pretty-format');
        this.bunyan = require('bunyan');

        // TODO: refatorar a maneira com que defino o hostname
        this.config.log.bunyan.streams[0].path = this.config.log.bunyan.streams[0].path.replace('{hostname}', this.os.hostname());

        this.bunyanLogger = bunyanLogger || this.bunyan.createLogger(this.config.log.bunyan);

        this.prefix = this.buildPrefix(module);
    }

    // Exibe o log de maneira formatada no console
    // Ex.: Minha Aplicação - Modulo => Carregando alguma coisa { cpf: '12345678912' }
    console(type, msg, obj) {
        if (type !== 'trace')
            console.log(`${type.toUpperCase()} ${this.prefix} ${msg} ${obj ? this.pretty(obj, { min: true }) : ''}`);
    }

    info(msg, obj) {
        this.write({
            msg,
            obj,
            type: 'info'
        });
    }

    warn(msg, obj) {
        this.write({
            msg,
            obj,
            type: 'warn'
        });
    }

    debug(msg, obj) {
        this.write({
            msg,
            obj,
            type: 'debug'
        });
    }

    trace(msg, obj) {
        this.write({
            msg,
            obj,
            type: 'trace'
        });
    }

    error(msg, obj) {
        this.write({
            msg,
            obj,
            type: 'error'
        });
    }

    fatal(msg, obj) {
        this.write({
            msg,
            obj,
            type: 'fatal'
        });
    }

    child(props, serializers) {
        return this.bunyanLogger.child(props, serializers);
    }

    // Metodo responsavel por enviar o log para o bunyan.
    // Por padrao, todos os objetos enviados são logados como string
    // caso você precise que algum objeto seja logado como json para que seja mapeado como um campo separado no elasticsearch,
    // envie a propriedade "natural":
    //   logger.debug('Mensagem', { natural: { tempoDeResposta: 1300 } });
    // 
    // Caso seja necessário logar um objeto como json e um outro objeto como string na mesma chamada, envie as propriedades "natural" e "pretty"
    //   logger.debug('Mensagem', { natural: { tempoDeResposta: 1300 }, pretty: response });
    write({ type, prefix = this.prefix, msg, obj }) {

        if (this.config.log.debug)
            this.console(type, msg, obj);

        if (obj) {
            if (obj.natural) {
                if (obj.pretty)
                    obj = { natural: obj.natural, pretty: this.pretty(obj.pretty) };
                else
                    obj = { natural: obj.natural };
            }
            else
                obj = { pretty: this.pretty(obj) };

            this.bunyanLogger[type](obj, `${this.prefix} ${msg}`);
        }
        else
            this.bunyanLogger[type](`${this.prefix} ${msg}`);
    }

    // cria um prefixo para o log
    buildPrefix(module) {
        module = module ? ` - ${module}` : '';
        return `${this.config.app.name}${module} => `;
    }
}

// Para criar uma nova instancia de log faça
// let logger = require('app/config/log')({ module: 'Nome do Modulo' });
module.exports = function (options = {}) {
    return new Log(options);
}
// Classe responsavel por gerenciar os erros da aplicação, 
// diferenciando erros de negócio de erros inesperados
class ApplicationErrors {

    constructor() {
        this.logger = require('./log')({ module: 'Error Handler' });
        this.restifyErros = require('restify-errors');

        this.defineCustomErros();
    }

    defineCustomErros() {
        this.restifyErros.makeConstructor('BusinessError', {
            statusCode: 500,
            failureType: 'motion'
        });

        // coloque aqui seus erros customizados para poder 
        // instanciar em qualquer lugar da aplicação.
        //
        // this.restifyErros.makeConstructor('FaturaPendenteError', {
        //     statusCode: 500,
        //     failureType: 'motion'
        // });
        //
        this.restifyErros.makeConstructor('CpfInvalidoError', {
            statusCode: 400,
            failureType: 'motion'
        });
        //
        // Ex.: applicationError.throw('Formato de CPF inválido', 'CpfInvalidoError')

    }

    throw(error, type) {
        let isError = error instanceof Error;

        if (isError)
            return error;

        if (!type)
            return new this.restifyErros.BusinessError(error);

        return new this.restifyErros[type](error);
    }

    handle(req, res, error, callback) {
        this.logger.error(error.message, { path: req.path(), error });
        callback();
    }
}

module.exports = new ApplicationErrors();
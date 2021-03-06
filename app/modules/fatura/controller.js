const applicationError = require('../../config/errors');

// Esse é um controller de exemplo, renomeie e altere de acordo com o seu projeto
class FaturaController {
    constructor() {
        this.logger = require('../../config/log')({ module: 'Fatura Controller' });
        this.faturaService = require('./service/fatura-service');
    }

    _before(req, res, next) {
        this.logger.bunyanLogger = req.log;
        this.faturaService.logger.bunyanLogger = req.log;
        return next();
    }

    // Exemplo de controller comunicando com a service 
    // e retornando os status HTTP corretos.
    carregar(req, res, next) {

        let { id, mes, ano } = req.params;

        this.logger.debug('Carregando a fatura', req.params);

        if (id, mes, ano) {
            this.faturaService.carregar(id, mes, ano)
                .then(fatura => {
                    if (fatura) {
                        res.send(fatura);
                        return next();
                    }
                    else {
                        // envia um erro 404 para o o método handle do error handler padrão em /app/config/errors.js
                        return next(applicationError.throw('A fatura não foi encontrada', 'NotFoundError'));
                    }
                })
                .catch(erro => {
                    // caso o erro não seja do tipo Erro, o métod throw lança automaticamente um BusinesError
                    return next(applicationError.throw(erro));
                });
        }
        else
            return next(applicationError.throw('Campos obrigatórios não preenchidos.', 'BadRequestError'));
    }
}

module.exports = new FaturaController();
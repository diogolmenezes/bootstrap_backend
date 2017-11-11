const applicationError = require('../../config/errors');

// Esse é um controller de exemplo, renomeie e altere de acordo com o seu projeto
class FaturaController {
    constructor() {
        this.faturaService = require('./service/fatura-service');
        this.logger = require('../../config/log')({ module: 'Fatura Controller' });
    }

    // Exemplo de controller comunicando com a service 
    // e retornando os status HTTP corretos.
    carregar(req, res, next) {
        let { id, mes, ano } = req.params;

        this.logger.debug('Carregando a fatura', req.params);

        if (id, mes, ano) {
            this.faturaService.carregar(id, mes, ano)
                .then(fatura => {
                    if (fatura)
                        res.send(fatura);
                    else
                        next(applicationError.throw('A fatura não foi encontrada', 'NotFoundError'));
                })
                .catch(erro => {
                    // caso o erro não seja do tipo Erro, o métod throw lança automaticamente um BusinesError
                    next(applicationError.throw(erro));
                });
        }
        else {
            // envia um erro 400 para o o método handle do error handler padrão em /app/config/errors.js
            next(applicationError.throw('Campos obrigatórios não preenchidos.', 'BadRequestError'));
        }
    }
}

module.exports = new FaturaController();
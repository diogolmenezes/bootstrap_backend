// Esse é um controller de exemplo, renomeie e altere de acordo com o seu projeto
class FaturaController {
    constructor() {
        this.faturaService = require('./service');
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
                        res.send(404);
                })
                .catch(erro => {
                    this.logger.error('Erro inesperado', erro);
                    res.send(500, { mensagem: 'Erro inesperado ao carregar fatura.' })
                });
        }
        else
            res.send(400, { mensagem: 'Campos obrigatórios não preenchidos.' });

        next();
    }
}

module.exports = new FaturaController();
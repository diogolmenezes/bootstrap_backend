// esse é um controller de exemplo, renomeie e altere de acordo com o seu projeto
class FaturaController {

    constructor() {
        this.faturaService = require('./service');
        this.logger = require('../../config/log')('Fatura');
    }

    carregar(req, res, next) {

        let { id, mes, ano } = req.params;




        this.logger.debug({ msg: 'Carregando o controller' });

        if (!id && !mes && !ano)
            res.send(400, { mensagem: 'Campos obrigatórios não preenchidos.' });
        else {
            this.faturaService.carregar(id, mes, ano)
                .then(fatura => {
                    res.send(fatura);
                })
                .catch(erro => {
                    res.send(500, { mensagem: 'Erro inesperado' });
                });
        }

        next();
    }


    excluir(req, res, next) {
        res.send(204);
        next();
    }
}

module.exports = new FaturaController();
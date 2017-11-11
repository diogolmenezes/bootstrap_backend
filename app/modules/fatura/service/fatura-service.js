// Esse é uma service de exemplo, renomeie e altere de acordo com o seu projeto
class FaturaService {
    constructor() {
        this.logger = require('../../../config/log')({ module: 'Fatura Service' });
        this.faturaRepository = require('../repository/fatura-repository');
    }

    carregar(id, mes, ano) {

        this.logger.debug('Procurando fatura no banco de dados', { id, mes, ano });

        return new Promise((resolve, reject) => {

            this.faturaRepository.carregar({ id, mes, ano })
                .then(fatura => {

                    if (fatura)
                        this.logger.debug('A fatura foi encontrada', fatura);

                    resolve(fatura);
                })
                .catch(reject);
        });
    }
}

module.exports = new FaturaService();
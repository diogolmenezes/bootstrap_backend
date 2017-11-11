// Esse é uma service de exemplo, renomeie e altere de acordo com o seu projeto
class FaturaService {
    constructor() {
        this.logger = require('../../config/log')({ module: 'Fatura Service' });
    }

    carregar(id, mes, ano) {

        this.logger.debug('Procurando fatura no banco de dados', { id, mes, ano });

        return new Promise((resolve, reject) => {
            let fatura = { valor: 56.21, cliente: id, mes, ano };

            this.logger.debug('A fatura foi encontrada', fatura);

            resolve(fatura);
        });
    }
}

module.exports = new FaturaService();
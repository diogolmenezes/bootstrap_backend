// Esse é uma repository de exemplo, renomeie e altere de acordo com o seu projeto
class FaturaRepository {
    constructor() {
        this.model = require('../model/fatura');
    }

    carregar({ id, mes, ano }) {
       // return this.model.findOne({ cliente: id, mes, ano });
        // exemplo sem banco de dados
        return Promise.resolve({ valor: 56.21, cliente: id, mes, ano });
    }
}

module.exports = new FaturaRepository();
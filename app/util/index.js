class Util {
    constructor() {
        this.config = require('../config');
    }

    // mostra um log no console com o prefixo da aplicação
    // ex.: Minha Aplicação => Uma mensagem qualquer
    display(message) {
        console.log(`${this.config.app.name} => ${message}`);
    }
}

module.exports = new Util();
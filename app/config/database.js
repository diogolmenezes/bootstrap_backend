// Classe responsável por gerenciar a conexão com o banco de dados (MongoDB)
class Database {
    constructor() {
        this.config = require('../config');
        this.logger = require('../config/log')({ module: 'Database' });
        this.mongoose = require('mongoose');
        this.mongoose.Promise = global.Promise;

        this.connect();
    }

    connect() {
        if (this.config.db) {
            this.mongoose.connect(this.config.db.url, this.config.db.options)
                .then(() => {
                    this.logger.debug(`Conectado com sucesso no banco de dados [${this.config.db.url}]`);
                })
                .catch(erro => {
                    this.logger.error(`Erro ao conectar com banco de dados [${this.config.db.url}]`, erro);
                });

            this.mongoose.connection.on('close', () => {
                this.logger.debug(`A conexão com o banco de dados foi fechada [${this.config.db.url}]`);
            })
        }
    }
}

module.exports = new Database().mongoose;
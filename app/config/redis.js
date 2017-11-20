class Redis {
    constructor() {
        this.config = require('../config');
        this.logger = require('./log')({ module: 'Redis' });

        this.redis = require('redis');

        let bluebird = require('bluebird');
        bluebird.promisifyAll(this.redis.RedisClient.prototype);
        bluebird.promisifyAll(this.redis.Multi.prototype);
    }

    configure() {

        let client = this.redis.createClient(this.config.redis);

        client.on('end', () => {
            this.logger.debug('A conexão com o REDIS foi finalizada.');
        });

        return client;

    }
}

module.exports = new Redis().configure();
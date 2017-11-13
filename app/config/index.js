// carrega o arquivo de configuração conforme a variavel NODE_ENV.
var env = process.env.NODE_ENV || 'default';
var config = require(`./env/${env}`);

// injeta automaticamente a propriedade app.env no json de configuração
config.app.env = env;

module.exports = config;
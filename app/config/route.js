class Route {
    constructor(server) {
        this.config = require('../config');
        this.glob = require('glob');
        this.path = require('path');
        this.util = require('../util');
    }

    // importa as rotas de todos os modulos da aplicação localizados na pasta modules
    importModuleRoutes() {
        this.glob.sync('app/modules/*/route.js').forEach((file) => {
            this.util.display(`Importando rotas de [${file}]`);
            require(this.path.resolve(file));
        });
    }

    // calcula informações de rota do modulo
    // ex.: { base: 'minha-aplicacao', module: 'fatura', full: 'minha-aplicacao.fatura' }
    info(routeFile) {
        let moduleName = this.path.basename(this.path.dirname(routeFile));
        let full = `${this.config.app.baseRoute}/${moduleName}`

        return {
            full,
            base: this.config.app.baseRoute,
            module: moduleName
        }
    }
}

module.exports = new Route();
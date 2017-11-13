// Classe responsavel por realizar a criação e validação de tokens JWT
class Authentication {

    constructor() {
        this.applicationErrors = require('./errors');
        this.jwt = require('jsonwebtoken');
        this.config = require('../config');
    }

    // Cria um novo token JWT.
    // Ex.: Você pode chamar esse método após o seu login e repassar o token gerado 
    // através do header "Authorization" para suas rotas protegidas
    createJWT(data, expire = true) {

        let options = expire ? { expiresIn: this.config.authentication.jwt.expiresIn } : {};

        this.jwt.sign(data, this.config.authentication.jwt.secret, options);
    }

    // Protege uma rota
    // Para proteger uma rota basta configurar o método protect na definição da rota que deseja proteger,
    // dessa forma ela estará preparada para receber e validar um token jwt recebido através do header 
    // "Authorization".
    // Ex.: server.get('/aplicacao/saldo', authentication.protect.bind(authentication), controller.consultarSaldo.bind(controller));
    // curl -H 'Authorization: Baerer um_token_jwt' -X 'GET' localhost:3000/aplicacao/saldo
    protect(req, res, next) {

        let isEnabled = this.config.authentication && this.config.authentication.jwt && this.config.authentication.jwt.enabled;

        if (isEnabled) {

            // A propriedade req.authorization é o resultado do parse realizado pelo plugin
            // this.server.use(this.restify.plugins.authorizationParser());  definido nas configurações de middleware do restify
            // caso ele seja desabilitado, podemos recuperar o header dessa forma req.header('Authorization')
            let token = req.authorization.credentials

            this.jwt.verify(token, this.config.authentication.jwt.secret, (err, decoded) => {

                if (err) {
                    if (err.name === 'TokenExpiredError')
                        return next(this.applicationErrors.throw('JWT expirado.', 'ForbiddenError')); // 403

                    return next(this.applicationErrors.throw('Acesso negado.', 'UnauthorizedError')); // 401
                }

                req.user = decoded.data;

                return next();
            });
        }
        else
            return next();
    }
}

module.exports = new Authentication();
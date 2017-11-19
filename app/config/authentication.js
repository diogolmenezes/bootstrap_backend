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

        let isEnabled = this.config.authentication && this.config.authentication.enabled;
        let hasSentAuthorization = Object.keys(req.authorization).length;

        if (isEnabled) {

            // A propriedade req.authorization é o resultado do parse realizado pelo plugin
            // this.server.use(this.restify.plugins.authorizationParser());  definido nas configurações de middleware do restify
            // caso ele seja desabilitado, podemos recuperar o header direto do header req.header('Authorization')

            if (hasSentAuthorization) {
                switch (this.config.authentication.scheme) {
                    case 'Basic': this.basicValidate(req, res, next); break;
                    case 'Baerer': this.baererValidate(req, res, next); break;
                    default:
                        return next(this.applicationErrors.throw('Acesso negado.', 'UnauthorizedError')); // 401
                }
            }
            else {
                res.header('WWW-Authenticate', `${this.config.authentication.scheme} realm="Acessar API"`);
                return next(this.applicationErrors.throw('Acesso negado.', 'UnauthorizedError')); // 401
            }
        }
        else
            return next();
    }

    basicValidate(req, res, next) {

        let { username, password } = req.authorization.basic;

        // ALTERE AQUI, caso você esteja utilizando autenticação basica 
        if (username == 'admin' && password == 'admin')
            next();
        else
            next(this.applicationErrors.throw('Usuário ou senha inválidos.', 'ForbiddenError'));
    }

    baererValidate(req, res, next) {

        this.jwt.verify(req.authorization.credentials, this.config.authentication.jwt.secret, (err, decoded) => {

            if (err) {
                if (err.name === 'TokenExpiredError')
                    next(this.applicationErrors.throw('JWT expirado.', 'ForbiddenError')); // 403
                else
                    next(this.applicationErrors.throw('Acesso negado.', 'UnauthorizedError')); // 401
            }
            else {
                req.user = decoded.data;
                next();
            }
        });

    }
}

module.exports = new Authentication();
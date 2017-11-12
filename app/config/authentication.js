class Authentication {

    constructor() {
        this.applicationErrors = require('./errors');
        this.jwt = require('jsonwebtoken');
        this.config = require('../config');
    }

    protect(req, res, next) {

        let isEnabled = this.config.authentication && this.config.authentication.jwt && this.config.authentication.jwt.enabled;

        console.log('NOVO =>', this.jwt.sign({ data: { login: 'diogo.leitao@oi.net.br', perfil: 'admin' } }, this.config.authentication.jwt.secret, { expiresIn: 10 }));

        if (isEnabled) {
            let token = req.header('x-authorization');

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
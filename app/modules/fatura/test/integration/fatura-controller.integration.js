const server = require('../../../../../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('Fatura', () => {

    after(() => {
        // termina o processo do restify após todos os testes
        server.close();
    })

    it('Deve retornar uma fatura', (done) => {
        supertest(server)
            .get('/minha-aplicacao/cliente/1/fatura/12/2017')
            .set('x-origin-application', 'minha-aplicacao')
            .set('x-origin-channel', 'teste')
            .set('x-origin-device', 'desktop')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });
});
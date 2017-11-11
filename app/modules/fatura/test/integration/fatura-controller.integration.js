const server = require('../../../../../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('Fatura', () => {

    after(() => {
        // termina o processo do restify após todos os testes
        process.exit();
    })

    it('Deve retornar uma fatura', (done) => {
        supertest(server)
            .get('/minha-aplicacao/cliente/1/fatura/12/2017')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('Deve retornar uma fatura', (done) => {
        supertest(server)
            .get('/minha-aplicacao/cliente/1/fatura/12/2017')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });
});
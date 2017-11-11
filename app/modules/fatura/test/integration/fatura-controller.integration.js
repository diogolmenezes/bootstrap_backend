const server = require('../../../../../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('Fatura', () => {
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
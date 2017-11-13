<!-- node cacheia os requires http://justjs.com/posts/singletons-in-node-js-modules-cannot-be-trusted-or-why-you-can-t-just-do-var-foo-require-baz-init -->

- restify
- versionamento nas rotas ( podemos ter varias versoes de api rodando no mesmo projeto )
- schemas para debugar os testes unitarios e integrados direto do visual code
- schemas para rodar a aplicação apontanto para qualquer um dos ambientes direto do visual code sem ter que editar nenhum arquivo
- logs que assumem o contexto do modulo
- log automaticos de auditoria dos requests, com tempos
- replicação de log no debug quando a aplicação está em debug mode
- pre-commit configurado, só comita se passar nos testes
- error handler padrão
- suporte a tipos customizados de erro
- melhor controle dos status code das apis 
- novo readme mais util para o projeto
- autenticação JWT
- controle de rate limit

---

# Pendencias

- teste do new Error();
- bug no integration test
- manter o request ID por todos os logs ( quem sabe colocar no modulo )
- hostname no log de auditoria


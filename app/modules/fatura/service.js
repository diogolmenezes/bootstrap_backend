class FaturaService {

    carregar(id, mes, ano) {
        return new Promise((resolve, reject) => {
            resolve({ id, valor: 56.21 });
        });
    }

    excluir(id) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

module.exports = new FaturaService();
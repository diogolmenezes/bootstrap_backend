// Exemplo de um modelo do mongoose
const mongoose = require('mongoose');

var schema = mongoose.Schema({
    cliente: String,
    mes: String,
    ano: String,
    valor: Number
});

module.exports = mongoose.model('Fatura', schema);
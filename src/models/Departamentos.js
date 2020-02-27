const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DepartamentoSchema = new schema({
    Codigo: {type: String, required: true, index: true, unique: true},
    Nombre: {type: String, required: true}
}, {
    timestamps: true
}); 

const Departamentos = mongoose.model('Departamentos', DepartamentoSchema);

module.exports = Departamentos;
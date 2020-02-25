const mongoose = require('mongoose');
const schema = mongoose.Schema;

const empresaSchema = new schema({
    nombre: {type: String, required: true},
    nit: {type: String, required: true, index: true, unique: true},
    ips_padre: {type: String},
}, {
    timestamps: true //Guarda la fecha de cración o modificación de la Schema.
});

const empresas = mongoose.model('empresas', empresaSchema);

module.exports = empresas;
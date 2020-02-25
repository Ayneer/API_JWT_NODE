const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usuarioSchema = new schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    edad: {type: Number, required: true},
    telefono: {type: Number, required: true},
    identificacion: {type: Number, required: true, index: true, unique: true},
    id_identificacion: {type: String, required: true},// 1, 2, 3 => CC, TI, ...
    id_empresa: {type: String, required: true}, //_id empresa
}, {
    timestamps: true //Guarda la fecha de cración o modificación de la Schema.
});

const usuarios = mongoose.model('usuarios', usuarioSchema);

module.exports = usuarios;
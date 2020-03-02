const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usuarioSchema = new schema({
    nombres: {type: String, required: true}, //Cambiar Nombres
    apellidos: {type: String, required: true}, //Cambiar Apellidos
    edad: {type: Number, required: true}, //Cambiar Edad
    telefono: {type: Number, required: true}, //Cambiar Telefono
    identificacion: {type: Number, required: true, index: true, unique: true}, //Cambiar Identificacion
    id_identificacion: {type: String, required: true},// 1, 2, 3 => CC, TI, ... //Cambiar IdIdentificacion
    id_empresa: {type: String, required: true}, //_id empresa //Cambiar IdEmrpresa
}, {
    timestamps: true //Guarda la fecha de cración o modificación de la Schema.
});

const usuarios = mongoose.model('usuarios', usuarioSchema);

module.exports = usuarios;
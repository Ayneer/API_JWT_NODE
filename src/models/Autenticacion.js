const mongoose = require('mongoose');
const schema = mongoose.Schema;

const autenticacionSchema = new schema({
    correo: {type: String, required: true, index: true, unique: true},//Cambiar Correo
    contraseña: {type: String, required: true},//Cambiar Contraseña
    id_rol: {type: Number, required: true}, // 1, 2, 3 => ADMINISTRADOR, IPS, EPS //Cambiar IdContraseña
    id_identificacion: {type: Number, required: true, index: true, unique: true},// Id_usuario //Cambiar IdUsario
}, {
    timestamps: true
});

const autenticaciones = mongoose.model('autenticaciones', autenticacionSchema);

module.exports = autenticaciones;
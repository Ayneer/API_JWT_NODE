const mongoose = require('mongoose');
const schema = mongoose.Schema;

const autenticacionSchema = new schema({
    correo: {type: String, index: true, unique: true},
    contraseña: {type: String, required: true},
    id_rol: {type: Number, required: true},
    id_identificacion: {type: Number, index: true, unique: true},
}, {
    timestamps: true
});

const autenticaciones = mongoose.model('autenticaciones', autenticacionSchema);

module.exports = autenticaciones;
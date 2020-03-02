const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RolSchema = new schema({
    tipo_perfil: {type: String, required: true, index: true, unique: true}, //Cambiar TipoPerfil
    id_rol: {type: Number, required: true, index: true, unique: true}, //Cambiar IdRol
    descripcion: {type: String, required: true}, //Cambiar Descripcion
}, {
    timestamps: true
}); 

const Roles = mongoose.model('roles', RolSchema);

module.exports = Roles;
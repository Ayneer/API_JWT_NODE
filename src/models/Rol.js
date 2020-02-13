const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RolSchema = new schema({
    tipo_perfil: {type: String, required: true, index: true, unique: true},
    id_rol: {type: Number, required: true, index: true, unique: true},
    descripcion: {type: String, required: true},
}, {
    timestamps: true
}); 

const Roles = mongoose.model('roles', RolSchema);

module.exports = Roles;
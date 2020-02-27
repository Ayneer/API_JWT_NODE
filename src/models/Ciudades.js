const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CiudadSchema = new schema({
    Codigo: {type: String, required: true, index: true, unique: true},
    Nombre: {type: String, required: true}
}, {
    timestamps: true
}); 

const Ciudades = mongoose.model('Ciudades', CiudadSchema);

module.exports = Ciudades;
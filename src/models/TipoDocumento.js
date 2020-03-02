const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TipoDocumentoSchema = new schema({
    tipo_identificacion: {type: Number, required: true, unique: true}, //Cambiar TipoIdentificacion
    acronimo: {type: String, required: true, unique: true}, //Cambiar Acronimo
    descripcion: {type: String, required: true}, //Cambiar Descripcion
}, {
    timestamps: true
}); 

const tipoDocumentos = mongoose.model('tipo_documentos', TipoDocumentoSchema); //Cambiar a Documentos

module.exports = tipoDocumentos;

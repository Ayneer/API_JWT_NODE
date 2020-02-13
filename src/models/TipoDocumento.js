const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TipoDocumentoSchema = new schema({
    tipo_identificacion: {type: Number, required: true, unique: true},
    acronimo: {type: String, required: true, unique: true},
    descripcion: {type: String, required: true},
}, {
    timestamps: true
}); 

const tipoDocumentos = mongoose.model('tipo_documentos', TipoDocumentoSchema);

module.exports = tipoDocumentos;

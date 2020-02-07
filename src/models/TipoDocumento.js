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

tipoDocumentos.watch().on('change', data => {
    console.log(`¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ Cambio en la base de datos !!!!!!!!!!!!!!`)
    console.log(`Nombre de la base de datos: ${data.ns.db}`)
    console.log(`Nombre de la coleccion: ${data.ns.coll}`)
    console.log(data.fullDocument)
});

module.exports = tipoDocumentos;

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const representanteLegalSchema = new schema({ 
    TipoIdentificacion: {type: String, required: true},
    NumeroIdentificacion: {type: String, required: true, index: true, unique: true},
    Nombres: {type: String, required: true},
    Apellidos: {type: String, required: true},
    Telefono: {type: String},
    Celular: {type: String},
    Correo: {type: String, index: true, unique: true},
});

const empresaSchema = new schema({
    nombre: {type: String, required: true},//Borrar
    nit: {type: String, required: true, index: true, unique: true},//Cambiar Nit
    ips_padre: {type: String},//Cambiar IpsPadre
    RazonSocial: {type: String, required: true},
    NumeroLicencia: {type: String},
    CodigoHabilitacion: {type: String},
    CodigoSGSSS: {type: String},
    PaginaWeb: {type: String},
    Departamento: {type: String, required: true},
    Ciudad: {type: String, required: true},
    Direccion: {type: String, required: true},
    Telefono: {type: String},
    Celular: {type: String, required: true},
    Correo: {type: String, required: true},
    RepresentanteLegal: representanteLegalSchema
}, {
    timestamps: true //Guarda la fecha de cración o modificación de la Schema.
});

const empresas = mongoose.model('empresas', empresaSchema);

module.exports = empresas;
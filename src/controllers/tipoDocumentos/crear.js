const repositorio = require('../../repositories/tipoDocumentos');
const funciones = require('../funciones');

const handler = async (req, res, next) => {
    try {
        const {tipo_identificacion, descripcion, acronimo} = req.body;
        const tipoDocumento = {tipo_identificacion, descripcion, acronimo};
        const respuesta = await repositorio.crear(tipoDocumento);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }
}

module.exports = handler;
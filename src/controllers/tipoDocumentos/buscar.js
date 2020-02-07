const repositorio = require('../../repositories/tipoDocumentos');
const funciones = require('../funciones');

const handler = async (req, res, next) => {
    try {
        const {tipo_identificacion} = req.params;
        const respuesta = await repositorio.buscar(tipo_identificacion);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }
}

module.exports = handler;
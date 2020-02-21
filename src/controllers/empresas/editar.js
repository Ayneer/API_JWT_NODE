const repositorio = require('../../repositories/empresa');
const funciones = require('../funciones');

const editar = async (id, actualizacion) => {
    const respuesta = await repositorio.editar(id, actualizacion);
    return respuesta;
}

const handler = async (req, res, next) => {
    try {
        const {actualizacion} = req.body;
        const {id} = req.params;
        
        const respuesta = await editar(id, actualizacion);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, editar};
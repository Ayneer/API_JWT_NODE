const repositorio = require('../../repositories/Ciudad');
const funciones = require('../funciones');

const editar = async (_id, actualizacion) => await repositorio.editar(_id, actualizacion);

const handler = async (req, res, next) => {
    try {
        
        const {actualizacion} = req.body;
        const {_id} = req.params;
        
        const respuesta = await editar(_id, actualizacion);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, editar};
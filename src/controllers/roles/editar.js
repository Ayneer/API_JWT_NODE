const repositorio = require('../../repositories/rol');
const funciones = require('../funciones');

const handler = async (req, res, next) => {
    try {
        
        const {actualizacion} = req.body;
        const {id_rol} = req.params;
        
        const respuesta = await repositorio.editar(id_rol, actualizacion);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }
}

module.exports = handler;
const repositorio = require('../../repositories/rol');
const funciones = require('../funciones');

const handler = async (req, res, next) => {
    try {
        const {id_rol} = req.params;
        const respuesta = await repositorio.buscar(id_rol);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }
}

module.exports = handler;
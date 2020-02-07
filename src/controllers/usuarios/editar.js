const repositorio = require('../../repositories/usuario');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    try {
        
        const {identificacion, actualizacion } = req.body;
        
        const respuesta = await repositorio.editar(identificacion, actualizacion);
        let status = funciones.obtenerStatus(respuesta.status);
        
        res.status(status).send(respuesta);

    } catch (error) {
        next(error);
    }

}

module.exports = handler;
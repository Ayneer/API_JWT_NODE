const repositorio = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const listarPorIdUsuario = async idsUsuarios => await repositorio.listarPorIdUsuario(idsUsuarios);

const handler = async (req, res, next) => {
    try {

        const respuesta = await listarPorIdUsuario(idsUsuarios);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }

}

module.exports = {handler, listarPorIdUsuario};
const repositorio = require('../../repositories/usuario');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    try {

        const respuesta = await repositorio.listar();
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }

}

module.exports = handler;
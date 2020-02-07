const repositorio = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    const {id_identificacion} = req.params;
    const {actualizacion} = req.body;

    try {
        const respuesta = await repositorio.editar(id_identificacion, actualizacion);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = handler;
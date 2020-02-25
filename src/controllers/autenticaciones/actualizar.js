const repositorio = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const actualizar = async (_id, actualizacion) => await repositorio.editar(_id, actualizacion);

const handler = async (req, res, next) => {

    const {id_identificacion} = req.params;
    const {actualizacion} = req.body;

    try {
        const respuesta = await actualizar(id_identificacion, actualizacion);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, actualizar};
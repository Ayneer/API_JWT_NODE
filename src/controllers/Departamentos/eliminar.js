const repositorio = require('../../repositories/Departamento');
const funciones = require('../funciones');

const eliminar = async codigo => await repositorio.eliminar(codigo);

const handler = async (req, res, next) => {
    try {
        const {codigo} = req.params;
        const respuesta = await eliminar(codigo);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, eliminar};
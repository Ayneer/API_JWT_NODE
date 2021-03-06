const repositorio = require('../../repositories/empresa');
const funciones = require('../funciones');

const eliminar = async nit => await repositorio.eliminar(nit);

const handler = async (req, res, next) => {
    try {
        const {nit} = req.params;
        const respuesta = await eliminar(nit);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, eliminar};
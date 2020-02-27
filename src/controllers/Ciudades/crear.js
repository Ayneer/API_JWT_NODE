const repositorio = require('../../repositories/Ciudad');
const funciones = require('../funciones');

const crear = async ciudad => await repositorio.crear(ciudad);

const handler = async (req, res, next) => {

    try {
        const { codigo, nombre } = req.body;
        const ciudad = { codigo, nombre };
        const respuesta = crear(ciudad);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, crear};
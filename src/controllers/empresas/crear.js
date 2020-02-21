const repositorio = require('../../repositories/empresa');
const funciones = require('../funciones');

const crear = async empresa => {
    const respuesta = await repositorio.crear(empresa);
    return respuesta;
}

const handler = async (req, res, next) => {

    try {
        const { nombre, nit, ips_padre } = req.body;
        const empresa = { nombre, nit, ips_padre };
        const respuesta = await crear(empresa);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    handler,
    crear
};
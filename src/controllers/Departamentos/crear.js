const repositorio = require('../../repositories/Departamento');
const funciones = require('../funciones');

const crear = async departamento => await repositorio.crear(departamento);

const handler = async (req, res, next) => {

    try {
        const { Codigo, Nombre } = req.body;
        const departamento = { Codigo, Nombre };
        const respuesta = await crear(departamento);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, crear};
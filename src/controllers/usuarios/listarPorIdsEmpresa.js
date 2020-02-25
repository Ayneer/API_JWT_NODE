const repositorio = require('../../repositories/usuario');
const funciones = require('../funciones');

const listarPorIdEmpresa = async idsEmpresa => await repositorio.listarPorIdEmpresa(idsEmpresa);

const handler = async (req, res, next) => {

    try {
        const respuesta = await listarPorIdEmpresa(idsEmpresa);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }

}

module.exports = {handler, listarPorIdEmpresa};
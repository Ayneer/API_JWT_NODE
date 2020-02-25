const repositorio = require('../../repositories/usuario');
const funciones = require('../funciones');

const eliminarPorIdEmpresa = async id_empresa => await repositorio.eliminarPorIdEmpresa(id_empresa);

const handler = async (req, res, next) => {

    let status = 500;
    let respuesta = {};

    try {

        const {id_empresa} = req.params;
        respuesta = await eliminarPorIdEmpresa(id_empresa);

        status = funciones.obtenerStatus(respuesta.status);
        res.status(status).send(respuesta);

    } catch (error) {
        next(error);
    }

};

module.exports = {handler, eliminarPorIdEmpresa};
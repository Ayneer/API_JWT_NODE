const repositorio = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const eliminarPorCorreos = async listaCorreos => repositorio.eliminarPorCorreos(listaCorreos);

const handler = async (req, res, next) => {

    const {listaCorreos} = req.body;

    try {
        const resultado = await eliminarPorCorreos(listaCorreos);
        let status = funciones.obtenerStatus(resultado.status);

        res.status(status).send(resultado);

    } catch (error) {
        next(error)
    }

};

module.exports = {handler, eliminarPorCorreos};
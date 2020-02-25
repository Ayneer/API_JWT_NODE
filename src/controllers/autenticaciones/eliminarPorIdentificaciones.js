const repositorio = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const eliminarPorIdentificaciones = async listaIds => repositorio.eliminarPorIdentificaciones(listaIds);

const handler = async (req, res, next) => {

    const {listaIds} = req.body;

    try {
        const resultado = await eliminarPorIdentificaciones(listaIds);
        let status = funciones.obtenerStatus(resultado.status);

        res.status(status).send(resultado);

    } catch (error) {
        next(error)
    }

};

module.exports = {handler, eliminarPorIdentificaciones};
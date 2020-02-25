const repositorio = require('../../repositories/usuario');
const funciones = require('../funciones');

const buscar = async identificacion => await repositorio.buscar(identificacion);

const handler = async (req, res, next) => {

    const {identificacion} = req.params;
    try {
        const resultado = awaitbuscar(identificacion);
        let status = funciones.obtenerStatus(resultado.status);

        res.status(status).send(resultado);
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, buscar};
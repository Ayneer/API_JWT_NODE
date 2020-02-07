const repositorio = require('../../repositories/usuario');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    const {identificacion} = req.params;
    try {
        const resultado = await repositorio.buscar(identificacion);
        let status = funciones.obtenerStatus(resultado.status);

        res.status(status).send(resultado);
    } catch (error) {
        next(error);
    }
}

module.exports = handler;
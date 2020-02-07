const repositorio = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    const {id_identificacion} = req.params;

    try {
        const resultado = await repositorio.eliminar(id_identificacion);
        let status = funciones.obtenerStatus(resultado.status);

        res.status(status).send(resultado);

    } catch (error) {
        next(error)
    }

};

module.exports = handler;
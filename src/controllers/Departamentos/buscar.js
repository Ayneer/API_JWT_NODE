const repositorio = require('../../repositories/Departamento');
const funciones = require('../funciones');

const buscar = async codigo => await repositorio.buscar(codigo);

const handler = async (req, res, next) => {
    try {
        const {codigo} = req.params;
        const respuesta = await buscar(codigo);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, buscar};
const repositorio = require('../../repositories/empresa');
const funciones = require('../funciones');

const buscar = async id => await repositorio.buscar(id);

const handler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const respuesta = await buscar(id);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, buscar};
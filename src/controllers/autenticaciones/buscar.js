const repositorio = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const buscar = async correo => await repositorio.buscar(correo);

const handler = async (req, res, next) => {
    try {
        const {correo} = req.params;
        const respuesta = await buscar(correo);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, buscar};
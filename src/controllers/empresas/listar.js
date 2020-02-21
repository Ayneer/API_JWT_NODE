const repositorio = require('../../repositories/empresa');
const funciones = require('../funciones');

const listar = async () => await repositorio.listar();

const handler = async (req, res, next) => {
    console.log(req.user)
    try {

        const respuesta = await listar();
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }

}

module.exports = {handler, listar};
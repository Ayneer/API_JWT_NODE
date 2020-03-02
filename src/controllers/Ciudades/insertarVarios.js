const repositorio = require('../../repositories/Ciudad');
const funciones = require('../funciones');

const insertarVarios = async ciudades => await repositorio.insertarVarios(ciudades);

const handler = async (req, res, next) => {

    try {
        const { ciudades } = req.body;
        const respuesta = await insertarVarios(ciudades);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, insertarVarios};
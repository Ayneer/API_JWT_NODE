const repositorio = require('../../repositories/Departamento');
const funciones = require('../funciones');

const insertarVarios = async departamentos => await repositorio.insertarVarios(departamentos);

const handler = async (req, res, next) => {

    try {
        const { departamentos } = req.body;
        const respuesta = await insertarVarios(departamentos);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, insertarVarios};
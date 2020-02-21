const repositorio = require('../../repositories/rol');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    try {
        const { tipo_perfil, id_rol, descripcion } = req.body;
        const rol = { tipo_perfil, id_rol, descripcion };
        const respuesta = await repositorio.crear(rol);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = handler;
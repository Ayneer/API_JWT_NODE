const repositorio = require('../../repositories/usuario');
const funciones = require('../funciones');

const actualizar = async (identificacion, actualizacion) => await repositorio.editar(identificacion, actualizacion);

const handler = async (req, res, next) => {

    try {

        const { actualizacion, usuariOriginal } = req.body;
        const { identificacion } = req.params;
        // console.log(usuariOriginal)
        const respuestaUsuario = await actualizar(identificacion, actualizacion);
        let status = funciones.obtenerStatus(respuestaUsuario.status);

        res.status(status).send(respuestaUsuario);

    } catch (error) {
        next(error);
    }

}

module.exports = {handler, actualizar};
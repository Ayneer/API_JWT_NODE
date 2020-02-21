const repositorio = require('../../repositories/usuario');
const Rep_autenticacion = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    try {

        const { identificacion, actualizacion, usuariOriginal } = req.body;
        console.log(usuariOriginal)
        await repositorio.editar(identificacion, actualizacion);
        const respuesta_autenticacion = await Rep_autenticacion.editar(identificacion, actualizacion);
        const usuarioObj = await repositorio.buscar(identificacion);
        const autenticacionObj = await Rep_autenticacion.buscar(respuesta_autenticacion.data.correo);
        let usuarioActualizado = {
            ...usuarioObj.data,
            ...autenticacionObj.data
        }
        let status = funciones.obtenerStatus(respuesta_autenticacion.status);

        res.status(status).send({
            ...respuesta_autenticacion,
            usuarioActualizado
        });

    } catch (error) {
        next(error);
    }

}

module.exports = handler;
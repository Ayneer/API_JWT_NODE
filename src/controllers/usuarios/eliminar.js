const repositorio = require('../../repositories/usuario');
const Rep_autenticacion = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const eliminar = async identificacion => await repositorio.eliminar(identificacion);

const handler = async (req, res, next) => {

    let status = 500;
    let respuesta = {};

    try {

        const {identificacion} = req.params;
        respuesta = await eliminar(identificacion);

        if(!respuesta.error){//Si no hubo algun error eliminando al usuario
            //Se procede a eliminar su autenticación
            respuesta = await Rep_autenticacion.eliminar(identificacion);
        }

        status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);

    } catch (error) {
        next(error);
    }

};

module.exports = {handler, eliminar};
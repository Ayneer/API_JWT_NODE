const rol_modelo = require('../../models/Rol');

let respuesta = {
    error: null,
    data: null,
    codigoError: null,
    status: null,
    mensajeError: null,
    tipoError: null
};

const crear = async rol => {
    const { EXITO_OPERACION, ERROR_INTERNO } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    };

    try {
        const rolModelo = new rol_modelo(rol);
        const resultado = await rolModelo.save();

        respuesta.error = false;
        respuesta.data = resultado;
        respuesta.status = EXITO_OPERACION;

    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.code;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;
}

const editar = async (id_rol, actualizacion) => {

    const { EXITO_OPERACION, ERROR_INTERNO } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    };

    try {

        const resultado = await rol_modelo.findOneAndUpdate({ id_rol }, actualizacion, { new: true });

        respuesta.error = false;
        respuesta.data = resultado;
        respuesta.status = EXITO_OPERACION;

    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.code;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;
}

const eliminar = async id_rol => {

    const { EXITO_OPERACION, ERROR_INTERNO } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    };

    try {

        const resultado = await rol_modelo.findOneAndDelete({ id_rol });

        respuesta.error = false;
        respuesta.data = resultado;
        respuesta.status = EXITO_OPERACION;

    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.code;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;
}

const listar = async () => {
    const { EXITO_OPERACION, ERROR_INTERNO } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    };

    try {

        const resultado = await rol_modelo.find({});

        respuesta.error = false;
        respuesta.data = resultado;
        respuesta.status = EXITO_OPERACION;

    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.code;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;
}

const buscar = async id_rol => {
    const { EXITO_OPERACION, ERROR_INTERNO } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    };

    try {

        const resultado = await rol_modelo.findOne({ id_rol });

        respuesta.error = false;
        respuesta.data = resultado;
        respuesta.status = EXITO_OPERACION;

    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.code;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;
}

module.exports = {
    crear,
    editar,
    eliminar,
    listar,
    buscar,
}
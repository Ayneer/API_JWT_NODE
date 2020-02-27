const modelo = require('../../models/Ciudades');

let respuesta = {
    error: null,
    data: null,
    codigoError: null,
    status: null,
    mensajeError: null,
    tipoError: null
};

const crear = async ciudad => {
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
        const ciudadModelo = new modelo(ciudad);
        const resultado = await ciudadModelo.save();

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

const editar = async (_id, actualizacion) => {

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

        const resultado = await modelo.findOneAndUpdate({ _id }, actualizacion, { new: true });

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

const eliminar = async codigo => {

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

        const resultado = await modelo.findOneAndDelete({ codigo });

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

        const resultado = await modelo.find({});

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

const buscar = async codigo => {
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

        const resultado = await modelo.findOne({ codigo });

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
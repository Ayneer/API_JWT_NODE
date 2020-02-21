const empresa_modelo = require('../../models/Empresa');

let respuesta = {
    error: null,
    data: null,
    codigoError: null,
    status: null,
    mensajeError: null,
    tipoError: null
};

const crear = async empresa => {
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
        const Empresa = new empresa_modelo(empresa);
        const resultado = await Empresa.save();

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

        const resultado = await empresa_modelo.findOneAndUpdate({ _id }, actualizacion, { new: true });

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

const eliminar = async _id => {

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

        const resultado = await empresa_modelo.findOneAndDelete({ _id });

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

        const resultado = await empresa_modelo.find({});

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

const buscar = async _id => {

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

        const resultado = await empresa_modelo.findOne({ _id });

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
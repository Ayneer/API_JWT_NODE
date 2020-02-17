const autenticacion_modelo = require('../../models/Autenticacion');
const repositorio_usuario = require('../usuario');
const repositorio_rol = require('../rol');

let respuesta = {
    error: null,
    data: null,
    codigoError: null,
    status: null,
    mensajeError: null,
    tipoError: null
}

const buscarUsuarioAsociado = async id_identificacion => {

    const { ERROR_INTERNO, EXITO_OPERACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR, CODIGO_BUSQUEDA } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    try {
        //Se busca la autenticación con el correo
        const autenticacion = await autenticacion_modelo.findOne({ id_identificacion });

        //Si existe dicha autenticación, se procede a buscar el usuario al cual representa
        if (autenticacion) {
            const usuario = await repositorio_usuario.buscar(autenticacion.id_identificacion);//datos del usuario
            const rol = await repositorio_rol.buscar(autenticacion.id_rol);//datos del rol
            
            respuesta.error = false;
            respuesta.data = {
                ...usuario.data,
                correo: autenticacion.correo,
                id_rol: autenticacion.id_rol,
                ...rol.data._doc
            }
            respuesta.status = EXITO_OPERACION;

        } else {
            respuesta.error = true;
            respuesta.codigoError = CODIGO_BUSQUEDA;
            respuesta.status = FALLA_OPERACION;
            respuesta.mensajeError = "No existe una autenticación con el correo enviado.";
            respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
        }
    } catch (error) {
        console.log(error)
        respuesta.error = true;
        respuesta.codigoError = error.code;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }
    return respuesta;
}

const listar = async () => {

    const { ERROR_INTERNO, EXITO_OPERACION, CODIGO_BUSQUEDA, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    try {
        const resultado = await autenticacion_modelo.find({});

        if (resultado && resultado.length > 0) {
            let listaAutenticacion = [];
            const { data } = await repositorio_rol.listar();

            for (let index = 0; index < resultado.length; index++) {
                const element = parseInt(resultado[index].id_rol);
                for (let index2 = 0; index2 < data.length; index2++) {
                    const element2 = data[index2];
                    if (element === element2.id_rol) {
                        listaAutenticacion.push({
                            ...resultado[index]._doc,
                            ...element2._doc
                        });
                        break;
                    }
                }
            }
            for (let index = 0; index < listaAutenticacion.length; index++) {
                const element = listaAutenticacion[index];
                delete element['contraseña'];
            }
            respuesta.data = listaAutenticacion;
            respuesta.status = EXITO_OPERACION;
        } else {
            respuesta.error = true;
            respuesta.codigoError = CODIGO_BUSQUEDA;
            respuesta.status = FALLA_OPERACION;
            respuesta.mensajeError = "No existen autenticaciones.";
            respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
        }

    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.code;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;
}

const buscar = async correo => {

    const { ERROR_INTERNO, EXITO_OPERACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR, CODIGO_BUSQUEDA } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    try {
        //Se busca la autenticación con el correo
        const autenticacion = await autenticacion_modelo.findOne({ correo });

        //Si existe dicha autenticación
        if (autenticacion) {

            const rol = await repositorio_rol.buscar(autenticacion.id_rol);//datos del rol
            
            respuesta.error = false;
            respuesta.data = {
                ...autenticacion._doc,
                ...rol.data._doc
            };
            respuesta.status = EXITO_OPERACION;

        } else {
            respuesta.error = true;
            respuesta.codigoError = CODIGO_BUSQUEDA;
            respuesta.status = FALLA_OPERACION;
            respuesta.mensajeError = "No existe una autenticación con el correo enviado.";
            respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
        }
    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.code;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;
}

const crear = async autenticacion => {

    const { CODIGO_CREACION, EXITO_OPERACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR, ERROR_INTERNO } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    try {

        let nuevaAutenticacion = new autenticacion_modelo(autenticacion);
        const resultado = await nuevaAutenticacion.save();

        if (resultado) {
            respuesta.error = false;
            respuesta.data = resultado;
            respuesta.status = EXITO_OPERACION;
        }else{
            respuesta.error = true;
            respuesta.codigoError = CODIGO_CREACION;
            respuesta.status = FALLA_OPERACION;
            respuesta.mensajeError = "No se pudo completar el registro de la autenticación";
            respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
        }

    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.code;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;

}

const eliminar = async id_identificacion => {

    const { ERROR_INTERNO, EXITO_OPERACION, CODIGO_ELIMINACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    if (id_identificacion) {
        try {

            const resultado = await autenticacion_modelo.findOneAndDelete({ id_identificacion });

            if (resultado) {
                respuesta.error = false;
                respuesta.data = resultado;
                respuesta.status = EXITO_OPERACION;
            } else {
                respuesta.error = true;
                respuesta.codigoError = CODIGO_ELIMINACION;
                respuesta.status = FALLA_OPERACION;
                respuesta.mensajeError = "No existe la autenticación con la identificación enviada";
                respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
            }

        } catch (error) {
            respuesta.error = true;
            respuesta.codigoError = error.code;
            respuesta.status = ERROR_INTERNO;
            respuesta.mensajeError = error.message;
            respuesta.tipoError = error._message;
        }
    } else {
        respuesta.error = true;
        respuesta.codigoError = CODIGO_ELIMINACION;
        respuesta.status = FALLA_OPERACION;
        respuesta.mensajeError = "Debe enviar la identificación de la autenticación";
        respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
    }

    return respuesta;
}

const editar = async (id_identificacion, actualizacion) => {

    const { ERROR_INTERNO, EXITO_OPERACION, CODIGO_ACTUALIZACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR } = process.env;
    
    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    if (id_identificacion && actualizacion) {
        try {
            const resultado = await autenticacion_modelo.findOneAndUpdate({ id_identificacion }, actualizacion, { new: true });

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
    } else {
        respuesta.error = true;
        respuesta.codigoError = CODIGO_ACTUALIZACION;
        respuesta.status = FALLA_OPERACION;
        respuesta.mensajeError = "Debe enviar la identificación y datos de actualización de la autenticación";
        respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
    }

    return respuesta;
}

module.exports = {
    buscar,
    buscarUsuarioAsociado,
    crear,
    eliminar,
    editar,
    listar,
}
const usuario_modelo = require('../../models/Usuario');
const repositorio_tipo_documento = require('../tipoDocumentos');
let respuesta = {
    error: null,
    data: null,
    codigoError: null,
    status: null,
    mensajeError: null,
    tipoError: null
};

const crear = async usuario => {

    const { ERROR_INTERNO, EXITO_OPERACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    try {
        let nuevo_usuario = new usuario_modelo(usuario);
        const resultado = await nuevo_usuario.save();

        //Si no hubo error al crear el usuario
        if (resultado) {

            respuesta.error = false;
            respuesta.data = resultado;
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

const existeUsuario = async (identificacion, correo) => {

    const { ERROR_INTERNO, EXITO_OPERACION } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    try {
        const resultado = await usuario_modelo.findOne({ $or: [{ identificacion }, { correo }] });
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
    console.log(_id)
    console.log(actualizacion)
    const { ERROR_INTERNO, EXITO_OPERACION, CODIGO_ACTUALIZACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    if (_id && actualizacion) {
        try {
            const resultado = await usuario_modelo.findOneAndUpdate({ _id }, actualizacion, { new: true });
            const dataIdentificacion = await repositorio_tipo_documento.buscar(parseInt(resultado.id_identificacion));

            respuesta.error = false;
            respuesta.data = {
                ...dataIdentificacion.data._doc,
                ...resultado._doc,
                descripcionTipoIdentificacion: dataIdentificacion.data.descripcion,
                _idUsuario: _id
            };
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
        respuesta.mensajeError = "Debe enviar la identificación y datos de actualización del usuario";
        respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
    }

    return respuesta;
}

const eliminar = async identificacion => {

    const { ERROR_INTERNO, EXITO_OPERACION, CODIGO_ELIMINACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    if (identificacion) {
        try {

            const resultado = await usuario_modelo.findOneAndDelete({ identificacion });

            if (resultado) {
                respuesta.error = false;
                respuesta.data = resultado;
                respuesta.status = EXITO_OPERACION;
            } else {
                respuesta.error = true;
                respuesta.codigoError = CODIGO_ELIMINACION;
                respuesta.status = FALLA_OPERACION;
                respuesta.mensajeError = "No existe el usuario con la identificación enviada";
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
        respuesta.mensajeError = "Debe enviar la identificación del usuario";
        respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
    }

    return respuesta;
}

const eliminarPorIdEmpresa = async id_empresa => {
    const { ERROR_INTERNO, EXITO_OPERACION, CODIGO_ELIMINACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    if (id_empresa) {
        try {

            const resultado = await usuario_modelo.deleteMany({ id_empresa });

            if (resultado) {
                respuesta.error = false;
                respuesta.data = resultado;
                respuesta.status = EXITO_OPERACION;
            } else {
                respuesta.error = true;
                respuesta.codigoError = CODIGO_ELIMINACION;
                respuesta.status = FALLA_OPERACION;
                respuesta.mensajeError = "No existe el usuario con la identificación de empresa enviada";
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
        respuesta.mensajeError = "Debe enviar la identificación de la empresa";
        respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
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
        const resultado = await usuario_modelo.find({});

        if (resultado && resultado.length > 0) {
            let listaUsuarios = [];
            const { data } = await repositorio_tipo_documento.listar();

            for (let index = 0; index < resultado.length; index++) {
                const element = parseInt(resultado[index].id_identificacion);
                for (let index2 = 0; index2 < data.length; index2++) {
                    const element2 = data[index2];
                    if (element === element2.tipo_identificacion) {
                        listaUsuarios.push({
                            ...element2._doc,
                            ...resultado[index]._doc,
                            descripcionTipoIdentificacion: element2.descripcion,
                            _idUsuario: resultado[index]._id
                        });
                        break;
                    }
                }
            }
            respuesta.error = false;
            respuesta.data = listaUsuarios;
            respuesta.status = EXITO_OPERACION;
        } else {
            respuesta.error = true;
            respuesta.codigoError = CODIGO_BUSQUEDA;
            respuesta.status = FALLA_OPERACION;
            respuesta.mensajeError = "No existen usuarios.";
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

const listarPorIdEmpresa = async idsEmpresa => {

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
        const resultado = await usuario_modelo.find({ id_empresa: { $in: idsEmpresa } });

        if (resultado && resultado.length > 0) {
            let listaUsuarios = [];
            const { data } = await repositorio_tipo_documento.listar();

            for (let index = 0; index < resultado.length; index++) {
                const element = parseInt(resultado[index].id_identificacion);
                for (let index2 = 0; index2 < data.length; index2++) {
                    const element2 = data[index2];
                    if (element === element2.tipo_identificacion) {
                        listaUsuarios.push({
                            ...element2._doc,
                            ...resultado[index]._doc,
                            descripcionTipoIdentificacion: element2.descripcion,
                            _idUsuario: resultado[index]._id
                        });
                        break;
                    }
                }
            }
            respuesta.error = false;
            respuesta.data = listaUsuarios;
            respuesta.status = EXITO_OPERACION;
        } else {
            respuesta.error = true;
            respuesta.codigoError = CODIGO_BUSQUEDA;
            respuesta.status = FALLA_OPERACION;
            respuesta.mensajeError = "No existen usuarios.";
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

const buscar = async identificacion => {

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
        const resultado = await usuario_modelo.findOne({ identificacion });

        if (resultado) {

            const dataIdentificacion = await repositorio_tipo_documento.buscar(parseInt(resultado.id_identificacion));

            respuesta.error = false;
            respuesta.data = {
                ...dataIdentificacion.data._doc,
                ...resultado._doc,
                descripcionTipoIdentificacion: dataIdentificacion.data.descripcion,
                _idUsuario: resultado._id
            };
            respuesta.status = EXITO_OPERACION;
        } else {
            respuesta.error = true;
            respuesta.codigoError = CODIGO_BUSQUEDA;
            respuesta.status = FALLA_OPERACION;
            respuesta.mensajeError = "No existe una usuario con la identificación enviada.";
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

module.exports = {
    crear,
    existeUsuario,
    editar,
    eliminar,
    listar,
    buscar,
    eliminarPorIdEmpresa,
    listarPorIdEmpresa,
}
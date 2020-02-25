const controladorEmpresa = require('../empresas');
const controladorUsuario = require('../usuarios');
const controladorAutenticacion = require('../autenticaciones');
const funciones = require('../funciones');

const obtenerCorreosUsuarios = usuarios => {
    let lista = [];

    for (let index = 0; index < usuarios.length; index++) {
        const usuario = usuarios[index];
        lista.push(usuario.correo);
    }

    return lista;
}

const obtenerIdsUsuarios = usuarios => {
    let lista = [];

    for (let index = 0; index < usuarios.length; index++) {
        const usuario = usuarios[index];
        lista.push(parseInt(usuario.identificacion));
    }

    return lista;
}

const handler = async (req, res, next) => {

    try {
        const { nit } = req.params;

        let respuesta = {};

        //Se elimina la empresa...
        const respuestaEmpresa = await controladorEmpresa.eliminar(nit);
        
        if (respuestaEmpresa.error || !respuestaEmpresa.data) {
            respuesta = respuestaEmpresa;
        } else {
            //Se obtiene y elimina la lista de correos de usuarios asociados al _id de la empresa...
            const { data: usuarios } = await controladorUsuario.listar();
            const usuariosFiltrados = usuarios.filter((user) => user.id_empresa === respuestaEmpresa.data._id.toString());
            //Se crea una lista de solo id de usuarios
            const listaIds = obtenerIdsUsuarios(usuariosFiltrados);
            const respuestaUsuario = await controladorUsuario.eliminarPorIdEmpresa(respuestaEmpresa.data._id);
            if (respuestaUsuario.error) {
                respuesta = respuestaUsuario;
            } else {
                //Se eliminan las autenticaciones asociadas a la lista de Ids previamente creada...
                const respuestaAutenticacion = await controladorAutenticacion.eliminarPorIdentificaciones(listaIds);
                if (respuestaAutenticacion.error) {
                    respuesta = respuestaAutenticacion;
                } else {
                    //Todos los objetos fueron eliminados con éxito!
                    respuesta = {
                        ...respuestaEmpresa.data.doc,
                        ...respuestaUsuario.data._doc,
                        ...respuestaAutenticacion.data._doc,
                        error: false,
                        status: respuestaAutenticacion.status
                    }
                }
            }
        }

        let estado = funciones.obtenerStatus(respuesta.status);
        res.status(estado).send(respuesta);

    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = {
    handler,
};
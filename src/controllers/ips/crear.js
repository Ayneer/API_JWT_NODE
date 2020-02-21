const controladorEmpresa = require('../empresas');
const controladorUsuario = require('../usuarios');
const controladorAutenticacion = require('../autenticaciones');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    try {
        const { nombre, nit, ips_padre, identificacion, nombres, apellidos, edad, telefono, id_identificacion, correo, contraseña, id_rol } = req.body;

        //Se separan e identifican los objetos
        let empresa = { nombre, nit, ips_padre };
        let usuario = { identificacion, nombres, apellidos, edad, telefono, id_identificacion, id_empresa: null };
        let autenticacion = { correo, contraseña: controladorAutenticacion.encriptar(contraseña), id_rol, id_identificacion: identificacion };
        let respuesta = {};

        //Se crea la empresa...
        const respuestaEmpresa = await controladorEmpresa.crear(empresa);
        if (respuestaEmpresa.error) {
            respuesta = respuestaEmpresa;
        } else {
            //Se crea al usuario con el id de la empresa...
            usuario.id_empresa = respuestaEmpresa.data._id;
            const respuestaUsuario = await controladorUsuario.crear(usuario);
            if (respuestaUsuario.error) {//Se revierten la creaciones anteriores...
                respuesta = respuestaUsuario;
                await controladorEmpresa.eliminar(nit);
            } else {
                //Se crea la autenticacion...
                const respuestaAutenticacion = await controladorAutenticacion.crear(autenticacion);
                if (respuestaAutenticacion.error) {//Se revierten la creaciones anteriores...
                    respuesta = respuestaAutenticacion;
                    await controladorEmpresa.eliminar(nit);
                    await controladorUsuario.eliminar(identificacion);
                } else {
                    //Todos los objetos fueron creados y almacenados con éxito!
                    respuesta = {
                        ...respuestaEmpresa.data,
                        ...respuestaUsuario.data,
                        ...respuestaAutenticacion.data,
                        error: false,
                        status: respuestaAutenticacion.status
                    }
                }
            }
        }

        let estado = funciones.obtenerStatus(respuesta.status);
        res.status(estado).send(respuesta);

    } catch (error) {
        next(error);
    }
}

module.exports = {
    handler,
    crear
};
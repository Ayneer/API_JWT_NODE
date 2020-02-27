const controladorEmpresa = require('../empresas');
const controladorUsuario = require('../usuarios');
const controladorAutenticacion = require('../autenticaciones');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    try {
        const { datosEmpresa, datosUsuario, datosAutenticacion } = req.body;

        //Se separan e identifican los objetos
        let empresa = datosEmpresa;
        let usuario = { ...datosUsuario, id_empresa: null };
        let autenticacion = { ...datosAutenticacion, contraseña: controladorAutenticacion.encriptar(datosAutenticacion.contraseña), id_identificacion: datosUsuario.identificacion };
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
                await controladorEmpresa.eliminar(empresa.nit);
            } else {
                //Se crea la autenticacion...
                const respuestaAutenticacion = await controladorAutenticacion.crear(autenticacion);
                if (respuestaAutenticacion.error) {//Se revierten la creaciones anteriores...
                    respuesta = respuestaAutenticacion;
                    await controladorEmpresa.eliminar(empresa.nit);
                    await controladorUsuario.eliminar(usuario.identificacion);
                } else {
                    //Todos los objetos fueron creados y almacenados con éxito!
                    respuesta = {
                        dataAuth: respuestaAutenticacion.data,
                        dataUsuario: respuestaUsuario.data,
                        dataEmpresa: respuestaEmpresa.data,
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
const controladorEmpresa = require('../empresas');
const controladorUsuario = require('../usuarios');
const controladorAutenticacion = require('../autenticaciones');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    try {
        const { actualizacionEmpresa, actualizacionUsuario, actualizacionAutenticacion, _idEmpresa, _idUsuario, _idAutenticacion } = req.body;
        
        let respuesta = {};
        const respuestaEmpresa = await controladorEmpresa.editar(_idEmpresa, actualizacionEmpresa);
        if (!respuestaEmpresa.error) {
            const respuestaUsuario = await controladorUsuario.actualizar(_idUsuario, actualizacionUsuario);
            // console.log(respuestaUsuario)
            if (!respuestaUsuario.error) {
                const respuestaAutenticacion = await controladorAutenticacion.actualizar(_idAutenticacion, actualizacionAutenticacion);
                if (!respuestaAutenticacion.error) {
                    respuesta = {
                        dataAuth: respuestaAutenticacion.data,
                        dataUsuario: respuestaUsuario.data,
                        dataEmpresa: respuestaEmpresa.data,
                        error: false,
                        status: respuestaAutenticacion.status
                    }
                }else{
                    respuesta = respuestaAutenticacion;
                }
            }else{
                respuesta = respuestaUsuario;
            }
        }else{
            respuesta = respuestaEmpresa;
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
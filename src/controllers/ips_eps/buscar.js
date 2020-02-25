const controladorEmpresa = require('../empresas');
const controladorUsuario = require('../usuarios');
const controladorAutenticacion = require('../autenticaciones');
const funciones = require('../funciones');

const buscar = async correo => {
    //Se busca el obj autenticacion...
    const respuestaAutenticacion = await controladorAutenticacion.buscar(correo);
    if (!respuestaAutenticacion.error) {
        //Se busca el obj usuario asociado a la autenticacion...
        const respuestaUsuario = await controladorUsuario.buscar(respuestaAutenticacion.data.id_identificacion);
        if (!respuestaUsuario.error) {
            //Se busca el obj empresa asociado al usuario...
            const respuestaEmpresa = await controladorEmpresa.buscar(respuestaUsuario.data.id_empresa.toString());
            if (!respuestaUsuario.error) {
                return {
                    dataAuth: respuestaAutenticacion.data,
                    dataUsuario: respuestaUsuario.data,
                    dataEmpresa: respuestaEmpresa.data,
                    error: false,
                    status: respuestaEmpresa.status,
                }
            } else {
                return respuestaUsuario;
            }
        } else {
            return respuestaUsuario;
        }
    } else {
        return respuestaAutenticacion;
    }
}

const handler = async (req, res, next) => {

    try {
        const { correo } = req.params;
        let respuesta = await buscar(correo);
        let estado = funciones.obtenerStatus(respuesta.status);
        res.status(estado).send(respuesta);

    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = {
    handler,
    buscar,
};
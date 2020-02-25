const controladorEmpresa = require('../empresas');
const controladorUsuario = require('../usuarios');
const controladorAutenticacion = require('../autenticaciones');
const funciones = require('../funciones');

const listarEps = async id_ips => {

    let listadoEps = [];
    let idsEmpresa = [];
    let idsUsuarios = [];

    //Se buscan las empresa asociadas al id de la ips enviada...
    const respuestaEmpresa = await controladorEmpresa.listarPorIpsPadre(id_ips);
    
    if (!respuestaEmpresa.error) {
        //Se buscan los usuarios asociados a cada Id de las empresas...
        for (let index = 0; index < respuestaEmpresa.data.length; index++) {
            const empresa = respuestaEmpresa.data[index];
            idsEmpresa.push(empresa._id);
        }

        const respuestaUsuario = await controladorUsuario.listarPorIdEmpresa(idsEmpresa);
        
        if (!respuestaUsuario.error) {
            //Se buscan las autenticaciones asociadas a cada id de usuario...
            for (let index = 0; index < respuestaUsuario.data.length; index++) {
                const usuario = respuestaUsuario.data[index];
                idsUsuarios.push(usuario.identificacion);
            }

            const respuestaAutenticacion = await controladorAutenticacion.listarPorIdUsuario(idsUsuarios);

            if (!respuestaAutenticacion.error) {

                for (let index = 0; index < respuestaAutenticacion.data.length; index++) {
                    const dataAuth = respuestaAutenticacion.data[index];
                    const dataUsuario = respuestaUsuario.data.filter((user) => user.identificacion === dataAuth.id_identificacion)[0];
                    const dataEmpresa = respuestaEmpresa.data.filter((empresa) => empresa._id.toString() === dataUsuario.id_empresa.toString())[0];
                    let obj = {
                        dataAuth,
                        dataUsuario,
                        dataEmpresa,
                    }
                    listadoEps.push(obj);
                }

                return {
                    listadoEps,
                    error: false,
                    status: respuestaAutenticacion.status,
                }
            } else {
                return respuestaAutenticacion;
            }
        } else {
            return respuestaUsuario;
        }
    } else {
        return respuestaEmpresa;
    }

}

const handler = async (req, res, next) => {

    try {
        const { id_ips } = req.params;
        let respuesta = await listarEps(id_ips);
        let estado = funciones.obtenerStatus(respuesta.status);
        res.status(estado).send(respuesta);

    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = {
    handler,
    listarEps,
};
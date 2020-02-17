const repositorio = require('../../repositories/usuario');
const repositorio_autenticacion = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const handler = async (req, res, next) => {

    let listaUsuarios = [];

    try {
        const { data: usuarios, status, error, codigoError, mensajeError, tipoError } = await repositorio.listar();
        const { data: autenticaciones } = await repositorio_autenticacion.listar();

        for (let index = 0; index < usuarios.length; index++) {
            const usuario = usuarios[index];
            for (let index2 = 0; index2 < autenticaciones.length; index2++) {
                const autenticacion = autenticaciones[index2];
                if(usuario.identificacion === parseInt(autenticacion.id_identificacion)){//Se busca la autenticación que le pertenece al usuario
                    listaUsuarios.push({
                        ...usuario,
                        ...autenticacion
                    });
                    break;
                }
            }
        }

        let status2 = funciones.obtenerStatus(status);

        res.status(status2).send({
            error, codigoError, mensajeError, tipoError, data: listaUsuarios, status 
        });
    } catch (error) {
        next(error);
    }

}

module.exports = handler;
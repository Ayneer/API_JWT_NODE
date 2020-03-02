const cDepartamentos = require('../Departamentos');
const cCiudades = require('../Ciudades');
const cTipoRoles = require('../roles');
const cTipoIdentificaciones = require('../tipoDocumentos');

const handler = async (req, res, next) => {
    try {

        const RespuestaRol = await cTipoRoles.listar();//TipoRoles
        if(!RespuestaRol.error){
            
        }
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }

}

module.exports = handler;
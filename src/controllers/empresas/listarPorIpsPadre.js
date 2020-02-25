const repositorio = require('../../repositories/empresa');
const funciones = require('../funciones');

const listarPorIpsPadre = async ips_padre => await repositorio.listarPorIpsPadre(ips_padre);

const handler = async (req, res, next) => {
    
    const { ips_padre } = req.body;

    try {

        const respuesta = await listarPorIpsPadre(ips_padre);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
        
    } catch (error) {
        next(error);
    }

}

module.exports = {handler, listarPorIpsPadre};
const bcrypt = require('bcrypt');
const repositorio = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const crear = async autenticacion => await repositorio.crear(autenticacion);
const encriptar = cadena => bcrypt.hashSync(cadena, parseInt(process.env.BCRYPT_ROUNDS));

const handler = async (req, res, next) => {

    const {BCRYPT_ROUNDS} = process.env;

    try {
        const { correo, contraseña, id_rol, id_identificacion } = req.body;
        const autenticacion = { correo, contraseña: encriptar(contraseña), id_rol, id_identificacion };
        const respuesta = await crear(autenticacion);
        let status = funciones.obtenerStatus(respuesta.status);

        res.status(status).send(respuesta);
    } catch (error) {
        next(error);
    }
}

module.exports = {handler, crear, encriptar};
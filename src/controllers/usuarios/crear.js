const bcrypt = require('bcrypt');
const Rep_usuario = require('../../repositories/usuario');
const Rep_autenticacion = require('../../repositories/autenticacion');
const funciones = require('../funciones');

const crear = async usuario => await Rep_usuario.crear(usuario);

const handler = async (req, res, next) => {

    const {BCRYPT_ROUNDS} = process.env;
    let status = 500;
    let respuesta = {};

    try {
        const { correo, contraseña, id_rol, identificacion, nombres, apellidos, edad, telefono, id_identificacion, id_empresa } = req.body;
        
        const usuario = {
            identificacion,
            nombres,
            apellidos,
            edad,
            telefono,
            id_identificacion,
            id_empresa
        };
        let autenticacionObj = {};
        let usuarioObj = {};
        
        const autenticacion = {
            correo,
            contraseña: bcrypt.hashSync(contraseña, parseInt(BCRYPT_ROUNDS)),//se encripta la contraseña, 
            id_rol, 
            id_identificacion: identificacion
        };

        respuesta = await crear(usuario);
        usuarioObj = await Rep_usuario.buscar(identificacion);
        if(!respuesta.error){//Si no hubo error al crear al usuario
            respuesta = {};
            respuesta = await Rep_autenticacion.crear(autenticacion);
            autenticacionObj = await Rep_autenticacion.buscar(correo);
            if(!respuesta.error){//Si no hubo error al crear la autenticacion
                status = funciones.obtenerStatus(respuesta.status);
            }else{
                //Se borra al usuario registrado, debido a que no debe existir un usuario sin su documento de autenticación
                await Rep_usuario.eliminar(identificacion);
                status = funciones.obtenerStatus(respuesta.status);
            }
            
        }else{
            status = funciones.obtenerStatus(respuesta.status);
        }
        let usuarioCompleto = {
            ...usuarioObj.data,
            ...autenticacionObj.data
        }
        delete usuarioCompleto['contraseña'];
        res.status(status).send({
            ...respuesta,
            usuarioCompleto
        });

    } catch (error) {
        next(error);
    }

};

module.exports = {handler, crear};
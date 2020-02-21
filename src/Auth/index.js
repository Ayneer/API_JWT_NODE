const passport = require('passport');
const bcrypt = require('bcrypt');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtEstrategia = require('passport-jwt').Strategy;
const estrategiaLocal = require('passport-local').Strategy;
const repositorio = require('../repositories/autenticacion');

//Configuración de la estrategia local
passport.use(new estrategiaLocal({
    usernameField: "correo",
    passwordField: "contraseña",
    session: false
}, async (username, password, done)=>{
    const { CODIGO_BUSQUEDA = 'BUSQUEDA DEL REGISTRO' } = process.env;
    console.log("ejecutando *callback verify* de estategia local");
    try {
        const respuesta = await repositorio.buscar(username);
        
        if(respuesta.error && respuesta.codigoError === CODIGO_BUSQUEDA){//No existe el usuario
            return done(null, false, { message: 'Usuario y/o contraseña incorrectas.' });
        }else if(!respuesta.error && !bcrypt.compareSync(password, respuesta.data.contraseña)){//Las contraseñas no coinciden
            return done(null, false, { message: 'Usuario y/o contraseña incorrectas.' });
        }else if(!respuesta.error){//Log in con éxito!
            const usuario = await repositorio.buscarUsuarioAsociado(respuesta.data.id_identificacion);
            // console.log(usuario)
            return done(null, usuario.data);
        }

    } catch (error) {
        console.log(error)
        return done(error);
    }
    
}));

const { KEY_JWT = 'SIOS_ARCHIVOS@NODE--',} = process.env;
let opciones = {};
opciones.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = KEY_JWT;

passport.use(new jwtEstrategia(opciones, async (jwt_payload, done)=>{
    console.log("ejecutando *callback verify* de estategia jwt");
    // console.log(jwt_payload)
    try {
        const respuesta = await repositorio.buscarUsuarioAsociado(jwt_payload.sub);
        if(respuesta.error){//No existe el usuario
            return done(null, false, {message: respuesta.mensajeError});
        }else if(!respuesta.error){//Usuario encontrado
            return done(null, respuesta.data);
        }

    } catch (error) {
        return done(error, false, {message: 'Error interno al buscar usuario'});
    }
}));

module.exports = passport;
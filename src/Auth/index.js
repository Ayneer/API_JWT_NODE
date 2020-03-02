const passport = require('passport');
const bcrypt = require('bcrypt');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtEstrategia = require('passport-jwt').Strategy;
const estrategiaLocal = require('passport-local').Strategy;
const cAuth = require('../controllers/Auth');

//Configuración de la estrategia local
passport.use(new estrategiaLocal({
    usernameField: "Correo",
    passwordField: "Contraseña",
    session: false
}, async (username, password, done)=>{
    const { CODIGO_BUSQUEDA = 'BUSQUEDA DEL REGISTRO' } = process.env;
    console.log("ejecutando *callback verify* de estategia local");
    try {
        const respuesta = await cAuth.buscar(username);
        if(respuesta.error && respuesta.codigoError === CODIGO_BUSQUEDA){//No existe el usuario
            return done(null, false, { message: 'Usuario y/o contraseña incorrectas.' });
        }else if(!respuesta.error && !bcrypt.compareSync(password, respuesta.dataAuth.contraseña)){//Las contraseñas no coinciden
            return done(null, false, { message: 'Usuario y/o contraseña incorrectas.' });
        }else if(!respuesta.error){//Log in con éxito!
            delete respuesta.dataAuth['contraseña'];
            return done(null, respuesta);
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
    // console.log(jwt_payload)username
    try {
        const respuesta = await cAuth.buscar(jwt_payload.username);
        if(respuesta.error){//No existe el usuario
            return done(null, false, {message: respuesta.mensajeError});
        }else if(!respuesta.error){//Usuario encontrado
            delete respuesta.dataAuth['contraseña'];
            return done(null, respuesta);
        }

    } catch (error) {
        return done(error, false, {message: 'Error interno al buscar usuario'});
    }
}));

module.exports = passport;
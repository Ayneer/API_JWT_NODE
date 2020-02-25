const passport = require('passport');
const jwt = require('jsonwebtoken');
const middlewares = require('../../middlewares');

const handler = (req, res, next) => {
    const { KEY_JWT, CREDENCIALES_INVALIDAS, ALGORITHM } = process.env;

    passport.authenticate("local", { session: false }, (error, usuario, message) => {
        console.log("ejecutando *callback auth* de authenticate para estrategia local");

        if (error || !usuario) {
            let mensaje = message && message.message ? message.message : "Error en las credenciales";
            next(middlewares.lanzarError(mensaje, CREDENCIALES_INVALIDAS));
        } else {
            console.log("*** comienza generacion token*****");
            const payload = {
                sub: usuario.dataUsuario.identificacion,
                // exp: Date.now() + parseInt(120000),
                username: usuario.dataAuth.correo
            };
            const token = jwt.sign(payload, KEY_JWT, {expiresIn: 86400});//exp => 1h
            res.json({ data: { token: token, usuario } });
        }
    })(req, res);
}

module.exports = handler;
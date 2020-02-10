const passport = require('passport');
const jwt = require('jsonwebtoken');
const middlewares = require('../../middlewares');

const handler = (req, res, next) => {
    const { KEY_JWT, CREDENCIALES_INVALIDAS, ALGORITHM } = process.env;

    passport.authenticate("local", { session: false }, (error, usuario, message) => {
        console.log("ejecutando *callback auth* de authenticate para estrategia local");

        if (error || !usuario) {
            console.log(message)
            next(middlewares.lanzarError(message.message, CREDENCIALES_INVALIDAS));
        } else {
            console.log("*** comienza generacion token*****");
            const payload = {
                sub: usuario.id_identificacion,
                // exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                username: usuario.correo
            };
            const token = jwt.sign(JSON.stringify(payload), KEY_JWT);
            res.json({ data: { token: token } });
        }
    })(req, res);
}

module.exports = handler;
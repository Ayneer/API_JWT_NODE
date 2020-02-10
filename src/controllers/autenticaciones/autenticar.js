const passport = require('passport');
const middleware = require('../../middlewares');

const handler = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (error, usuario, info) => {
        console.log("ejecutando *callback auth* de authenticate para estrategia jwt");

        //si hubo un error relacionado con la validez del token (error en su firma, caducado, etc)
        if(info){ 
            return next(middleware.lanzarError(info.message, process.env.CREDENCIALES_INVALIDAS)); 
        }

        //si hubo un error en la consulta a la base de datos
        if (error) { 
            console.log('Error ....')
            console.log(error)
            return next(error); 
        }

        //si el token está firmado correctamente pero no pertenece a un usuario existente
        if (!usuario) { 
            return next(middleware.lanzarError("No tienes autorización para ingresar.", process.env.CREDENCIALES_INVALIDAS)); 
        }

         //inyectamos los datos de usuario en la request
         req.user = usuario;
         next();
    })(req, res, next);
}

module.exports = handler;
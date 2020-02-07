const nnRuta = (req, res, next) =>{
    res.status(404).send({error: 'Endpoint no encontrado'});
}

const errorHandler = (err, req, res, next) => {
    const { CREDENCIALES_INVALIDAS } = process.env;
    console.log("ejecutando middleware de control de errores");
    let status = 500;
    if(err){
        switch (err.name) {
            case CREDENCIALES_INVALIDAS:
                status = parseInt(CREDENCIALES_INVALIDAS);
                break;
        
            default:
                break;
        }
        res.status(status).send({error: err.message});
    }
}

const lanzarError = (mensaje, tipoError) => {
    let error = new Error(mensaje);
    error.name = tipoError;
    return error;
}

module.exports = {
    nnRuta,
    errorHandler,
    lanzarError,
}
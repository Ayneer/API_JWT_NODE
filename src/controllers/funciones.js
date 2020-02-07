const obtenerStatus = data => {

    const { ERROR_INTERNO, EXITO_OPERACION, PAGINA_NO_ENCONTRADA, FALLA_OPERACION } = process.env;
    let status = null;

    switch (data) {

        case ERROR_INTERNO:
            status = 500;
            break;

        case EXITO_OPERACION:
            status = 200;
            break;

        case PAGINA_NO_ENCONTRADA:
            status = 404;
            break;

        case FALLA_OPERACION:
            status = 402;
            break;

        default:
            500;
    }

    return status;
}

module.exports = {
    obtenerStatus
}
const handler = (req, res, next) => {
    try {
        const usuario = req.user;
        if (usuario) {
            res.status(200).send({ error: false, mensaje: "Usuario encontrado con éxito!", usuario });
        } else {
            res.status(401).send({ error: true, mensaje: "No estas autenticado." });
        }
    } catch (error) {
        next(error);
    }

}

module.exports = handler;
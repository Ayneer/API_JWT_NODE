const cIpsEps = require('../ips_eps');

const buscar = async correo => {
    try {
        return await cIpsEps.buscar(correo);
    } catch (error) {
        return error
    }
}

module.exports = buscar;
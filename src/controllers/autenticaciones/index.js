const ingresar = require('./ingresar');
const { handler: crearHandler, crear, encriptar } = require('./crear');
const eliminar = require('./eliminar');
const actualizar = require('./actualizar');
const autenticar = require('./autenticar');
const buscar = require('./buscar');
const listar = require('./listar');

module.exports = {
    ingresar,
    crearHandler,
    encriptar,
    crear,
    eliminar,
    actualizar,
    autenticar,
    buscar,
    listar,
}
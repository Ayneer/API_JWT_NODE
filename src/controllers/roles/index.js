const crear = require('./crear');
const editar = require('./editar');
const eliminar = require('./eliminar');
const {listar, handler: listarHandler} = require('./listar');
const buscar = require('./buscar');

module.exports = {
    crear,
    editar,
    eliminar,
    listar,
    listarHandler,
    buscar,
}
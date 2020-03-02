const {crear, handler: crearHandler} = require('./crear');
const {insertarVarios, handler: insertarVariosHandler} = require('./insertarVarios');
const {editar, handler: editarHandler} = require('./editar');
const {eliminar, handler: eliminarHandler} = require('./eliminar');
const {listar, handler: listarHandler} = require('./listar');
const {buscar, handler: buscarHandler} = require('./buscar');

module.exports = {
    crear,
    editar,
    eliminar,
    listar,
    buscar,
    crearHandler,
    editarHandler,
    eliminarHandler,
    listarHandler,
    buscarHandler,
    insertarVarios,
    insertarVariosHandler,
}
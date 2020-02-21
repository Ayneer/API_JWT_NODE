const { handler: crearHandler, crear } = require('./crear');
const { handler: editarHandler, editar} = require('./editar');
const { handler: eliminarHandler, eliminar} = require('./eliminar');
const { handler: listarHandler, listar } = require('./listar');
const { handler: buscarHandler, buscar } = require('./buscar');

module.exports = {
    crearHandler,
    editarHandler,
    eliminarHandler,
    listarHandler,
    buscarHandler,
    crear,
    editar,
    eliminar,
    listar,
    buscar,
}
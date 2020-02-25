const { handler: handlerCrear } = require('./crear');
const { handler: handlerEliminar } = require('./eliminar');
const { handler: handlerBuscar, buscar } = require('./buscar');
const { handler: handlerlistarEps, listarEps } = require('./listarEps');
const { handler: handlerActualizar } = require('./actualizar');

module.exports = {
    handlerCrear,
    handlerEliminar,
    handlerBuscar,
    buscar,
    listarEps,
    handlerlistarEps,
    handlerActualizar,
}
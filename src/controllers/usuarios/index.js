const { handler: handlerCrear, crear} = require('./crear');
const actualizar = require('./editar');
const {eliminar, handler: handlerEliminar} = require('./eliminar');
const listar = require('./listar');
const buscar = require('./buscar');
const listarCompletos = require('./listarCompletos');

module.exports = {
    crear,
    handlerCrear,
    actualizar,
    eliminar,
    handlerEliminar,
    listar,
    buscar,
    listarCompletos,
};
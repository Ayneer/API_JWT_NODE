const { handler: handlerCrear, crear} = require('./crear');
const {handler: handlerActualizar , actualizar} = require('./actualizar');
const {eliminar, handler: handlerEliminar} = require('./eliminar');
const {eliminarPorIdEmpresa, handler: handlerEliminarPorIdEmpresa} = require('./eliminarPorIdEmpresa');
const {handler: handlerListar, listar} = require('./listar');
const {handler: handlerlistarPorIdEmpresa, listarPorIdEmpresa} = require('./listarPorIdsEmpresa');
const {handler: handlerBuscar, buscar} = require('./buscar');
const listarCompletos = require('./listarCompletos');

module.exports = {
    crear,
    handlerCrear,
    handlerActualizar,
    actualizar,
    eliminar,
    handlerEliminar,
    listar,
    handlerListar,
    buscar,
    handlerBuscar,
    listarCompletos,
    eliminarPorIdEmpresa,
    handlerEliminarPorIdEmpresa,
    handlerlistarPorIdEmpresa,
    listarPorIdEmpresa,
};
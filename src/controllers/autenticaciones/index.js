const { handler: crearHandler, crear, encriptar } = require('./crear');
const eliminar = require('./eliminar');
const {handler: eliminarPorCorreosHandler, eliminarPorCorreos} = require('./eliminarPorCorreos');
const {handler: eliminarPorIdentificacionesHandler, eliminarPorIdentificaciones} = require('./eliminarPorIdentificaciones');
const {handler: actualizarHandler, actualizar} = require('./actualizar');
const { handler: buscarHandler, buscar} = require('./buscar');
const listar = require('./listar');
const {handler: listarPorIdUsuarioHandler , listarPorIdUsuario} = require('./listarPorIdUsuario');

module.exports = {
    crearHandler,
    encriptar,
    crear,
    eliminar,
    actualizar,
    actualizarHandler,
    buscar,
    buscarHandler,
    listar,
    eliminarPorCorreosHandler,
    eliminarPorCorreos,
    eliminarPorIdentificacionesHandler,
    eliminarPorIdentificaciones,
    listarPorIdUsuarioHandler,
    listarPorIdUsuario,
}
const express = require('express');
const routes = express.Router();

//Constroladores
const cUsuario = require('./controllers/usuarios');
const cTipoDocumento = require('./controllers/tipoDocumentos');
const cAutenticacion = require('./controllers/autenticaciones');
const cRol = require('./controllers/roles');

//Rutas para las funcionalidades de la autenticación
routes.post('/login', cAutenticacion.ingresar);
routes.get('/sesion', cAutenticacion.autenticar, cAutenticacion.buscar);
routes.delete('/autenticacion/:id_identificacion', cAutenticacion.eliminar);
routes.put('/autenticacion/:id_identificacion', cAutenticacion.actualizar);

//Rutas para funcionalidades del modelo usuario
routes.post('/usuario', cUsuario.crear);
routes.put('/usuario', cUsuario.actualizar);
routes.delete('/usuario/:identificacion', cUsuario.eliminar);
routes.get('/usuarios', cAutenticacion.autenticar, cUsuario.listar);
routes.get('/usuario/:identificacion', cUsuario.buscar);

//Rutas para funcionalidades del modelo tipoDocumento
routes.post('/tipoDocumento', cTipoDocumento.crear);
routes.put('/tipoDocumento/:tipo_identificacion', cTipoDocumento.editar);
routes.delete('/tipoDocumento/:tipo_identificacion', cTipoDocumento.eliminar);
routes.get('/tipoDocumento', cTipoDocumento.listar);
routes.get('/tipoDocumento/:tipo_identificacion', cTipoDocumento.buscar);

//Rutas para funcionalidades del modelo rol
routes.post('/rol', cRol.crear);
routes.put('/rol/:id_rol', cRol.editar);
routes.delete('/rol/:id_rol', cRol.eliminar);
routes.get('/rol', cRol.listar);
routes.get('/rol/:id_rol', cRol.buscar);

module.exports = routes;
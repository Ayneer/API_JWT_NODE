const express = require('express');
const routes = express.Router();

//Constroladores
const cUsuario = require('./controllers/usuarios');
const cTipoDocumento = require('./controllers/tipoDocumentos');
const cAutenticacion = require('./controllers/autenticaciones');
const cRol = require('./controllers/roles');
const cCiudad = require('./controllers/Ciudades');
const cDepartamento = require('./controllers/Departamentos');
const cIps_Eps = require('./controllers/ips_eps');
const cAuth = require('./controllers/Auth');

//Rutas para las funcionalidades de la autenticación
routes.post('/login', cAuth.iniciarSesion);
routes.get('/sesion', cAuth.autenticar, cAuth.recuperarAuth);

//Rutas para funcionalidades del modelo autenticación
routes.get('/autenticaciones', cAuth.autenticar, cAutenticacion.listar);
routes.get('/autenticacion/:correo', cAuth.autenticar, cAutenticacion.buscarHandler);
routes.delete('/autenticacion/:id_identificacion', cAuth.autenticar, cAutenticacion.eliminar);
routes.put('/autenticacion/:id_identificacion', cAuth.autenticar, cAutenticacion.actualizarHandler);

//Rutas para funcionalidades del modelo usuario
routes.post('/usuario', cAuth.autenticar, cUsuario.handlerCrear);
routes.put('/usuario/:identificacion', cAuth.autenticar, cUsuario.handlerActualizar);
routes.delete('/usuario/:identificacion', cAuth.autenticar, cUsuario.handlerEliminar);
routes.get('/usuarios', cAuth.autenticar, cUsuario.handlerListar);
routes.get('/usuariosCompleto', cAuth.autenticar, cUsuario.listarCompletos);
routes.get('/usuario/:identificacion', cAuth.autenticar, cUsuario.handlerBuscar);

//Rutas para funcionalidades del modelo tipoDocumento
routes.post('/tipoDocumento', cAuth.autenticar, cTipoDocumento.crear);
routes.put('/tipoDocumento/:tipo_identificacion', cAuth.autenticar, cTipoDocumento.editar);
routes.delete('/tipoDocumento/:tipo_identificacion', cAuth.autenticar, cTipoDocumento.eliminar);
routes.get('/tipoDocumento', cAuth.autenticar, cTipoDocumento.listar);
routes.get('/tipoDocumento/:tipo_identificacion', cAuth.autenticar, cTipoDocumento.buscar);

//Rutas para funcionalidades del modelo rol
routes.post('/rol', cAuth.autenticar, cRol.crear);
routes.put('/rol/:id_rol', cAuth.autenticar, cRol.editar);
routes.delete('/rol/:id_rol', cAuth.autenticar, cRol.eliminar);
routes.get('/rol', cAuth.autenticar, cRol.listarHandler);
routes.get('/rol/:id_rol', cAuth.autenticar, cRol.buscar);

//Rutas para funcionalidades del modelo Ciudad
routes.post('/ciudad', cAuth.autenticar, cCiudad.crearHandler);
routes.post('/ciudades', cAuth.autenticar, cCiudad.insertarVariosHandler);
routes.put('/ciudad/:_id', cAuth.autenticar, cCiudad.editarHandler);
routes.delete('/ciudad/:codigo', cAuth.autenticar, cCiudad.eliminarHandler);
routes.get('/ciudades', cAuth.autenticar, cCiudad.listarHandler);
routes.get('/ciudad/:codigo', cAuth.autenticar, cCiudad.buscarHandler);

//Rutas para funcionalidades del modelo Departamento
routes.post('/departamento', cAuth.autenticar, cDepartamento.crearHandler);
routes.post('/departamentos', cAuth.autenticar, cDepartamento.insertarVariosHandler);
routes.put('/departamento/:_id', cAuth.autenticar, cDepartamento.editarHandler);
routes.delete('/departamento/:codigo', cAuth.autenticar, cDepartamento.eliminarHandler);
routes.get('/departamentos', cAuth.autenticar, cDepartamento.listarHandler);
routes.get('/departamento/:codigo', cAuth.autenticar, cDepartamento.buscarHandler);

//Rutas para funcionalidades de los usuarios IPS - EPS
routes.post('/ips_eps', cAuth.autenticar, cIps_Eps.handlerCrear);//Crear una IPS/EPS
routes.delete('/ips_eps/:nit', cAuth.autenticar, cIps_Eps.handlerEliminar);//Eliminar una IPS/EPS
routes.get('/eps/:id_ips', cAuth.autenticar, cIps_Eps.handlerlistarEps);//Obtener el listado de eps asociadas a una ips
routes.put('/ips_eps', cAuth.autenticar, cIps_Eps.handlerActualizar);//actualizar una ips/eps

module.exports = routes;
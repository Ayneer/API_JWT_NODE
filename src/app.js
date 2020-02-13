const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('./Auth');
const middlewares = require('./middlewares');
const app = express();

app.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/', routes);
//middlewares para el manejo de errores
app.use(middlewares.errorHandler);
app.use(middlewares.nnRuta);

module.exports = app;
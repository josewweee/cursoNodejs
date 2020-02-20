//ARCHIVO PARA CONFIGURAR LAS RUTAS A DONDE IREMOS (2)

const express = require('express');
const message = require('../components/message/network');

//si llamamos a /message, se ejecuta esta funcion
const routes = function (server) {
    server.use('/message', message);
}

//exportamos las rutas para que puedan ser llamadas
module.exports = routes;
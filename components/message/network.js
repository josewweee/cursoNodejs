//ARCHIVO DONDE MANEJAREMOS LAS PETICIONES HTTP (3)

const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');

/*router.get('/', function(req, res){
   console.log(req.headers);
    //podemos modificar el header desde aqui mismo
    res.header({
        "custom-header": "nuestro valor personalizado",
    });
    //llamamos a las respuestas genericas, para no usar res
    response.success(req, res, 'Lista de Mensajes');
});*/

router.get('/', function(req, res){
    //este filterMessages sirve para buscar por parametros si hay algo
    const filterMessages = req.query.user || null;
    controller.getMessages(filterMessages)
    .then((messageList)=> {
        response.success(req, res, messageList, 200);
    })
    .catch(e => {
        response.error(req, res, '[network] Error inesperado', 500, e);
    });
});

router.post('/', function(req, res){
    /* res.send('mensaje añadido'); */
    //podemos modificar el status que queramos
    /*  res.status(201).send({error: '', body: 'Creado Correctamente'}); */
  
    //Enviamos el mensaje al controler para que lo trabaje como js
    controller.addMessage(req.body.user, req.body.message)
    .then((fullMessage)=>{ //miramos si todo salio bien
        response.success(req, res,fullMessage , 201);
    }).catch(e => {
        response.error(req, res, '[Error en el controlador]', 400, e);
    });
    
    
    //manejador de errores con respuesta generica
   /* if (req.query.error == "ok"){
    response.error(req, res, 'error inesperado', 500, 'es solo una simulacion de los errores');
   } else {
    response.success(req, res, 'Creado Correctamente', 201);
   } */
});

router.delete('/:id', function(req, res){
   controller.deleteMessage(req.params.id)
   .then(() => {
       response.success(req, res, `Usuario ${req.params.id} eliminado`, 200)
   })
   .catch(e => {
       response.error(req, res, `[network] Error interno`, 500, e)
   });
});

router.patch('/:id', function(req, res){
    console.log(req.params.id);
    controller.updateMessage(req.params.id, req.body.message)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, 'Error interno', 500, e)
    });
});

router.put('/', function(req, res){
    res.send('mensaje cambiado');
});

module.exports = router;
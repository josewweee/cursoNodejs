//ARCHIVO PARA LA CONFIGURACION DEL SERVIDOR (1)

const express = require('express');
const bodyPaser = require('body-parser');

//con esto nos saltamos la interfaz routes
//const router = require('./components/message/network');

const db = require('./db'); 
//vamos a usar el router en routes
const router = require('./network/routes');

db('mongodb+srv://dbUser:clave123@nodejs-dmliq.mongodb.net/cursoNode?retryWrites=true');
var app = express();

//bodyparcer para especificar que info nos llegara
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: false}));
//app.use(router);

//usamos router(app) para llamar a routes
router(app);

app.use('/app', express.static('public'));

app.listen(3000);
console.log('la aplicacion esta escuchando en http://localhost:3000');

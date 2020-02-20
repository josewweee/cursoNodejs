//mongoose nos ayudara a la conexion con la db
const db = require('mongoose');

db.Promise = global.Promise;
 //la uri es nuestro link de conexion a mongo
 //const uri = 'mongodb+srv://dbUser:clave123@nodejs-dmliq.mongodb.net/cursoNode?retryWrites=true';
async function connect(uri) {
    //Conexion a mongoDB
    await db.connect(uri, {
        useNewUrlParser: true, //esto es para no tener problemas con versiones de la db
        useUnifiedTopology: true
    }).then(()=>{
        console.log('[db] conectada con exito');
    })
    .catch(err => console.log('[db] ', err));
}

module.exports = connect;

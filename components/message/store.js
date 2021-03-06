const Model = require('./model');


function addMessage(message) {

    //instanciamos un schema de model y guardamos info en db
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessage(filterUser) {
   
    return new Promise((resolve, reject) => {
        //asi leemos datos y buscamos si es necesario
        let filter = {};
        if (filterUser != null) {
            // regExp con la i, nos ayuda a omitir mayusculas y minusculas
            filter = { user: new RegExp(filterUser, "i") };
        }
        // con populate, buscaremos el ObjectId
        const messages = Model.find(filter)
        .populate('user')
        .exec((error, populated) => {
            if (error) {
                reject(error);
                return false;
            }
            resolve(populated);
        })
    })
}

async function updateText(id, message){
    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

function removeMessage (id) {
    return Model.deleteOne({
        _id: id
    });
}

//cambiamos los nombres de las funciones y las exportamos
module.exports = {
    add: addMessage,
    list: getMessage,
    update: updateText,
    remove: removeMessage,
}
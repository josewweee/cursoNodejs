const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');

router.post('/', function(req, res){
    controller.addUser(req.body.name)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(err => {
        response.error(req, res, '[network] internal error', 500, err);
    })
});

router.get('/', function (req, res){
    const filterUser = req.query.name || null
    controller.getUsers(filterUser)
    .then((userList) =>{
        response.success(req, res, userList, 200);
    })
    .catch(err => {
        response.error(req, res, '[network] error interno', 500, err);
    });
});

module.exports = router;
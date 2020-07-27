var express = require('express');
var router = express.Router();
var userController = require("../controllers/user.controller.js");
var cors = require('cors')


router.post('/', userController.create);
router.get('/', userController.readAll);
router.get('/passwd', userController.updateUserPassword);
//router.get('/:id', server.read);
//router.patch('/:id', server.update);
//router.patch('/command/ping', server.updateListToPing);
//router.patch('/command/ssh', server.updateListToHelth);
//router.patch('/command/passwd', server.updateListToPassword);
//router.delete('/', server.deleteList);
module.exports = router;

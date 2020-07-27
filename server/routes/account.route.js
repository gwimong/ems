var express = require('express');
var router = express.Router();
var AccountController = require("../controllers/account.controller.js");
var cors = require('cors')

router.post('/', AccountController.create);
router.get('/', AccountController.readAll);
router.get('/:id', AccountController.read);
router.patch('/:id', AccountController.update);
router.patch('/command/ssh', AccountController.updateListToSsh);
router.patch('/command/passwd', AccountController.updateListToPasswd);
router.delete('/', AccountController.deleteList);
module.exports = router;

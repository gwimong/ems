var express = require('express');
var router = express.Router();
var server = require("../controllers/server.controller.js");
var cors = require('cors')

router.post('/', server.create);
router.get('/', server.readAll);
router.get('/:id', server.read);
router.patch('/:id', server.update);
router.patch('/command/ping', server.updateListToPing);
router.delete('/', server.deleteList);
module.exports = router;

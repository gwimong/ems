var express = require('express');
var router = express.Router();
var sessionController = require("../controllers/session.controller.js");
var cors = require('cors')

router.get('/', sessionController.getSession);
router.post('/login', sessionController.login);
router.delete('/logout', sessionController.logout);
module.exports = router;

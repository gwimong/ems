var express = require('express');
var router = express.Router();
var pcController = require("../controllers/pc.controller.js");

/* GET PC listing. */
  router.get('/', pcController.readAll);

module.exports = router;

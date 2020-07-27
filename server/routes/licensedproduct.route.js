var express = require('express');
var router = express.Router();
var licensedProduct = require("../controllers/licensedproduct.controller.js");
var cors = require('cors')

/* GET licnese product listing. */
  router.post('/', licensedProduct.create);
  router.get('/', licensedProduct.readAll);
  router.get('/:id', licensedProduct.readOne);
  router.patch('/:id', licensedProduct.update);
  router.patch('/software-type/:softwareType/authorized/:isAuthorized', licensedProduct.updateListSoftwareTypeAndIsAuthorized);
  router.delete('/:id', licensedProduct.delete);
  router.delete('/', licensedProduct.deleteList);

module.exports = router;

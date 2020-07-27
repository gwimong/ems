var express = require('express');
var router = express.Router();
var licenseProduct = require("../controllers/inspaceproduct.controller.js");
var cors = require('cors')

/* GET licnese product listing. */
  router.get('/', licenseProduct.readAll);
  router.get('/:id', licenseProduct.readOne);
  router.patch('/:id', licenseProduct.update);
  router.patch('/software-type/:softwareType/authorized/:isAuthorized', licenseProduct.updateListSoftwareTypeAndIsAuthorized);
  router.delete('/:id', licenseProduct.delete);
  router.delete('/', licenseProduct.deleteList);

module.exports = router;

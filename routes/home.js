var express = require('express');
var router = express.Router();
var homeController = require ('../controllers/homeController');

router.get('/', homeController.list);

module.exports = router;
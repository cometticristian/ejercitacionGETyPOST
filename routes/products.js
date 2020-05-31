var express = require('express');
var router = express.Router();
var productsController = require ('../controllers/productsController');

router.get('/', productsController.list);
router.get('/detail/:id', productsController.detail);
router.post('/delete/:id', productsController.delete);
router.get('/detail/:id/edit', productsController.editForm);
router.post('/detail/:id/edit', productsController.edit);
router.post('/create', productsController.create);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

//Definimos las rutas
router.get('/actions', controller.getActions);
router.get('/actions/:id', controller.getActionsById);
router.put('/actions/:id', controller.updateAction);
router.post('/actions', controller.createAction);
router.delete('/actions/:id', controller.deleteAction);
router.get('/actions/updateStocks', controller.updateStockData);

module.exports = router;
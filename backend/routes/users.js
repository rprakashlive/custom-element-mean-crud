var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');
router.get('/', userCtrl.getUsers);
router.post('/create', userCtrl.createUser);

module.exports = router;
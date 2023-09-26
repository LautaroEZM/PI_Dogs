const express = require('express');
const router = express.Router();

const temperamentCOntroller = require('../controllers/temperament.controller');

router.get('/', temperamentCOntroller.getAll);

module.exports = router;

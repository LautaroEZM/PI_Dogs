const express = require('express');
const router = express.Router();

const dogController = require('../controllers/dog.controller');

router.post('/', dogController.createDog)
router.get('/', dogController.getAll);
router.get('/name', dogController.getByName);
router.get('/:breedId', dogController.getByBreedId);

module.exports = router;

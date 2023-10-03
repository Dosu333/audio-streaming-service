const songController = require('../controllers/song');
const express = require('express');
const router = express.Router();

router.post('/', songController.createNewSong) // Create new song

module.exports = router
const songController = require('../controllers/song');
const express = require('express');
const router = express.Router();
const upload = require('../middleware/imageUpload')

router.post('/upload', upload.single('songFile'), songController.createNewSong) // Upload new song

module.exports = router
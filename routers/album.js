const albumController = require('../controllers/album');
const express = require('express');
const upload = require('../middleware/imageUpload')

const router = express.Router();

router.post('/upload', upload.single('image'), albumController.createNewAlbum) // Create new Album

module.exports = router
const artistController = require('../controllers/artist');
const express = require('express');
const upload = require('../middleware/imageUpload')

const router = express.Router();

router.post('/', upload.single('image'), artistController.createNewArtist) // Create new artist
router.get('/', artistController.listArtists) // list artists
router.get('/:id', artistController.artistDetail) // Retrieve artist instance
router.delete('/:id', artistController.deleteArtist) // Delete artist instance

module.exports = router
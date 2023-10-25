const albumController = require('../controllers/album');
const express = require('express');
const upload = require('../middleware/imageUpload')

const router = express.Router();

router.post('/', upload.single('image'), albumController.createNewAlbum) // Create new Album
router.get('/', albumController.listAlbums) // List all albums
router.delete('/:id', albumController.deleteAlbum) // Delete album

module.exports = router
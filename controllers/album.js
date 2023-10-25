const { els } = require('../config/elasticsearchConfig');
const { Artist, Album } = require('../models/index');
const imageUrl = require('../utils/imageUrl');
require('dotenv/config')


// Create new album controller
const createNewAlbum = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                success: false,
                error: 'Album name is required'
            });
        }

        // Check if the artist already exists, if not, create a new album record.
        let artist = await Artist.findOne({ where: { id: req.body.artistId } });
        if (!artist) {
            return res.status(400).json({
                success: false,
                error: 'create an artist first'
            })
        }

        let imageFilePath = await imageUrl(req.file.destination, req.file.filename)

        const newAlbum = await Album.create({
            name: req.body.name,
            image: imageFilePath,
            artistId: artist.id,
        })

        return res.status(201).send(newAlbum)

    } catch (error) {
        console.error('Error creating a new album:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// List all albums controller
const listAlbums = async (req, res) => {
    try {
        const albums = await Album.findAll();
        return res.status(200).send(albums)
    } catch(error) {
        console.error('Error fetching albums:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }   
}

const deleteAlbum = async (req, res) => {
    try {
        // Find album
        const album = await Album.findByPk(req.params.id)

        if (!album) {
            return res.status(404).json({
                success: false,
                error: 'Album not found'
            })
        }

        // Delete album
        await album.destroy()
        return res.status(200).json({
            success: true,
            message: 'Album successfully deleted'
        })
    } catch(error) {
        console.error('Error deleting Album:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}

module.exports = {
    createNewAlbum,
    listAlbums,
    deleteAlbum
};

require('dotenv/config')
const imageUrl = require('../utils/imageUrl')
const { els } = require('../config/elasticsearchConfig');
const { Artist } = require('../models/index')


// Create new album controller
const createNewArtist = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({
                success: false,
                error: 'Artist name is required'
            });
        }

        
        let imageFilePath = await imageUrl(req.file.destination, req.file.filename)

        const newArtist = await Artist.create({
            name: req.body.name,
            image: imageFilePath,
            label: req.body.label,
            email: req.body.email
        })

        return res.status(201).send(newArtist)

    } catch (error) {
        console.error('Error creating a new artist:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// List all artists controller
const listArtists = async (req, res) => {
    try {
        const artists = await Artist.findAll();
        return res.status(200).send(artists)
    } catch(error) {
        console.error('Error fetching artists:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }   
}


// Retrieve artist controller
const artistDetail = async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id)

        if (!artist) {
            return res.status(400).json({
                success: false,
                error: 'artist does not exist'
            })
        }
        
        return res.status(200).json(artist);
    } catch(error) {
        console.error('Error retrieving artist:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
    
}

// Delete artist controller
const deleteArtist = async (req, res) => {
    try {
        // Find artist
        const artist = await Artist.findByPk(req.params.id)

        if (!artist) {
            return res.status(404).json({
                success: false,
                error: 'Artist not found'
            })
        }

        // Delete artist
        await artist.destroy()
        return res.status(200).json({
            success: true,
            message: 'Artist successfully deleted'
        })
    } catch(error) {
        console.error('Error deleting Artist:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}


module.exports = {
    createNewArtist,
    listArtists,
    artistDetail,
    deleteArtist,
};

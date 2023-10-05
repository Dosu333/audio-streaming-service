const { els } = require('../config/elasticsearchDb');
const { Artist, Album } = require('../models/index')


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
        let artist = await Artist.findOne({ where: { id: req.body.artist } });
        if (!artist) {
            return res.status(400).json({
                success: false,
                error: 'create an artist first'
            })
        }

        const newAlbum = await Album.create({
            name: req.body.name,
            image: req.file.buffer,
            artist: artist.id,
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

module.exports = {
    createNewAlbum,
};

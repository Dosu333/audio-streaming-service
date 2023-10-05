const { els } = require('../config/elasticsearchDb');
const { Song, Album } = require('../models/index')


// Create new song with metadata controller
const createNewSong = async (req, res) => {
    try {
        if (!req.body.album || !req.body.title || !req.file) {
            return res.status(400).json({
                success: false,
                error: 'Album name and song title are required'
            });
        }

        // Check if the album exists
        let album = await Album.findOne({ where: { id: req.body.album } });
        if (!album) {
            return res.status(400).json({
                success: false,
                error: 'create an album first'
            })
        }

        const newSong = await Song.create({
            title: req.body.title,
            songFile: req.file.buffer,
            album: album.id,
            tags: req.body.tags
        })

        return res.status(201).send(newSong)

    } catch (error) {
        console.error('Error creating a new song:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

module.exports = {
    createNewSong,
};

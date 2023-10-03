const { els } = require('../config/elasticsearchDb');
const uploadSongToGCS = require('../models/song')

// Create new song with metadata controller
const createNewSong = async (req, res) => {
    try {
        if (!req.body.artist || !req.body.name) {
            return res.status(400).json({
                success: false,
                error: 'Artist name and song name are required'
            });
        }

        const songUrl = await uploadSongToGCS(req.file.buffer, req.file.originalname);

        const songData = {
            artist: req.body.artist,
            name: req.body.name,
            recordLabel: req.body.recordLabel || '',
            songFile: songUrl,
            numberOfListens: 0,
            numberOfListeners: 0,
            likedByUser: [],
        };

        const result = await els.index({
            index: 'song-metadata',
            body: songData, 
        });

        res.status(201).json({
            success: true,
            message: 'Song created successfully',
            data: result,
        });
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

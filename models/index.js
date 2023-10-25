const User = require('./user')
const Artist = require('./artist')
const Album = require('./album')
const Song = require('./song')
const { sq } = require("../config/config");


// Define associations
User.belongsToMany(Song, { through: 'UserLikedSongs', as: 'likedSongs' });
Song.belongsToMany(User, { through: 'UserLikedSongs', as: 'likedByUsers' });

Album.hasOne(Song); // Each album can have one song
Song.belongsTo(Album); // Each song belongs to one album

Artist.hasOne(Album); // Each artist can have one album
Album.belongsTo(Artist);

// Sync  models
(async () => {
    try {
        await sq.sync();
        console.log("Database synchronized");
    } catch (error) {
        console.error("Error synchronizing models:", error);
    }
})();

module.exports = {
    User,
    Song,
    Artist,
    Album,
}
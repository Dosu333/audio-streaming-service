const User = require('./user')
const Artist = require('./artist')
const Album = require('./album')
const Song = require('./song')

User.belongsToMany(Song, { through: 'UserLikedSongs', as: 'likedSongs', foreignKey: 'user_id' });
Song.belongsTo(Album, { as: 'album' }); // Establish a belongsTo association with Album model
Song.belongsToMany(User, { through: 'UserLikedSongs', as: 'likedByUsers', foreignKey: 'song_id' });
Album.belongsTo(Artist, { as: 'artist' }); // Establish a belongsTo association with Artist model

module.exports = {
    User,
    Song,
    Artist,
    Album,
}
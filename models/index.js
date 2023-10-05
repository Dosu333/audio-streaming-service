const User = require('./user')
const Artist = require('./artist')
const Album = require('./album')
const Song = require('./song')

User.belongsToMany(Song, { through: 'UserLikedSongs', as: 'likedSongs', foreignKey: 'userId' });
Song.belongsTo(Album, { as: 'album' }); // Establish a belongsTo association with Album model
Song.belongsToMany(User, { through: 'UserLikedSongs', as: 'likedByUsers', foreignKey: 'songId' });
Album.belongsTo(Artist, { as: 'artist' }); // Establish a belongsTo association with Artist model


User.sync().then(() => {
    console.log("User Model synced");
});

Artist.sync().then(() => {
    console.log("Artist Model synced");
});

Album.sync().then(() => {
    console.log("Album Model synced");
});

Song.sync().then(() => {
    console.log("Song Model synced");
});

module.exports = {
    User,
    Song,
    Artist,
    Album,
}
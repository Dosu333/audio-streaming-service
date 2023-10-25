const { sq } = require("../config/config");
const { DataTypes } = require("sequelize");
const Album = require('./album')

const Song = sq.define("song", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sq.literal('uuid_generate_v4()'),
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    songFile: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: []
    },
    numberOfListens: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    numberOfListeners: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    albumId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Album,
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  });

sq.beforeSync(async () => {
    await sq.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
   });

// Song.sync().then(() => {
//     console.log("Song Model synced");
// });

module.exports = Song;
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Song = sequelize.define('song', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    youtubeUrl: {
        type: DataTypes.TEXT
    }
});

module.exports = Song;
const { getAll, create, getOne, remove, update, setArtists, setGenres } = require('../controllers/song.controller');
const express = require('express');

const routerSong = express.Router();

routerSong.route('/')
    .get(getAll)
    .post(create);

routerSong.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

routerSong.route('/:id/artists')
    .post(setArtists)

routerSong.route('/:id/genres')
    .post(setGenres)
module.exports = routerSong;
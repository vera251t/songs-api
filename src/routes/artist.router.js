const { getAll, create, getOne, remove, update, setGenres } = require('../controllers/artist.controller');
const express = require('express');

const routerArtist = express.Router();

routerArtist.route('/')
    .get(getAll)
    .post(create);

routerArtist.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

routerArtist.route('/:id/genres')
    .post(setGenres)
module.exports = routerArtist;
const catchError = require('../utils/catchError');
const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Song.findAll({
        include: [
            {
                model: Album,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Artist,
                attributes: ["name", "country"]
            },
            {
                model: Genre
            }
        ]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Song.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Song.findByPk(id, {
        include: [
            {
                model: Album,
                attributes: {
                    exclude: ['createAt', 'updateAt']
                }
            },
            {
                model: Artist,
                attributes: ["name", "country"]
            }
        ]
    });
    if(!result) return res.sendStatus(400);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Song.destroy({ where: {id} });
    if(!result) return res.sendStatus(400);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Song.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(400);
    return res.json(result[1][0]);
});

const setArtists = catchError(async(req, res) => {
    const { id } = req.params
    const song = await Song.findByPk(id)
    if(!song) return res.sendStatus(400)
    await song.setArtists(req.body)
    const artist = await song.getArtists()
    return res.json(artist)
});

const setGenres = catchError(async(req, res) => {
    const { id } = req.params
    const song = await Song.findByPk(id)
    if(!song) return res.sendStatus(400)
    await song.setGenres(req.body)
    const genres = await song.getGenres()
    return res.json(genres)
});
module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setArtists,
    setGenres
}
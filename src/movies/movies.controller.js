const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
async function movieExists(req, res, next) {
    const error = { status: 404, message: `Movie cannot be found.`};
    const { movieId } = req.params;
    if(!movieId) return next(error);

    const movie = await service.getMovieById(movieId);

    if(!movie) return next(error);
    res.locals.movie = movie;
    next();
}

async function list(req, res, next) {
    const movies = await service.getAllMovies();
    res.json({data: movies});
}

async function readTheaters(req, res, next){
    const { movieId } = req.params;
    const theaters = await service.getTheatersByMovieId(movieId)
    res.json({ data: theaters })
}


async function read(req, res) {
    const { movie } = res.locals;
    res.json({ data: movie });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
}
const knex = require("../db/connection");

const getAllMovies = () => 
    knex("movies")
        .distinct('movies.*')
        .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
        .where({ is_showing: true });

const getMovieById = movieId => 
    knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first();

const getTheatersByMovieId = movieId =>
    knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .where({ "mt.movie_id": movieId })


    

module.exports = {
    getAllMovies,
    getMovieById,
    getTheatersByMovieId,
   
}
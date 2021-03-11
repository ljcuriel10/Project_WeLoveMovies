const { returning, first } = require("../db/connection");
const knex = require("../db/connection");

const theatersMoviesJoin = knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id");

const getAllTheaters = () => theatersMoviesJoin
    .select(
        "t.name as name",
        "t.address_line_1 as address_line_1",
        "t.address_line_2 as address_line_2",
        "t.city as city",
        "t.state as state",
        "t.zip as zip",
        "m.title as movies:title",
        "m.runtime_in_minutes as movies:runtime_in_minutes",
        "m.rating as movies:rating",
        )
    

    
    
    



module.exports ={
    getAllTheaters,
}
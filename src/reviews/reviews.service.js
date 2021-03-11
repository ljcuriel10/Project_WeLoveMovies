const knex = require("../db/connection");

const reviewsMoviesJoin = knex("reviews as r")
        .join("movies as m", "m.movie_id", "r.movie_id")
        .join("critics as c", "c.critic_id", "r.critic_id")

const getReviewsWithCritic = knex("reviews as r")
        .select(
            "r.review_id as review_id",
            "r.content as content",
            "r.created_at as created_at",
            "r.updated_at as updated_at",
            "r.score as score",
            "r.movie_id as movie_id",
            "r.critic_id as critic_id",
            "c.preferred_name as critic:preferred_name",
            "c.surname as critic:surname",
            "c.organization_name as critic:organization_name"
        )
        .join("critics as c", "c.critic_id", "r.critic_id")

       
const getReviewsByMovieId = movieId =>
        reviewsMoviesJoin
            .select(
                "r.review_id as id",
                "r.content as content",
                "r.score as score",
                "r.movie_id as movie_id",
                "c.critic_id as critic:id",
                "c.preferred_name as critic:preferred_name",
                "c.surname as critic:surname",
                "c.organization_name as critic:organization_name"
            )
            .where({ "m.movie_id": movieId })
       
const getReviewById = reviewId => knex("reviews").select("*").where({review_id: reviewId}).first();

const updateReviewById = (reviewId, updatedReview) =>
     knex('reviews')
        .where( "review_id", reviewId )
        .update(updatedReview, "*")
        .then(() => getReviewsWithCritic.where({"r.review_id": reviewId}).first())


const deleteReviewById = reviewId => knex("reviews").where({ review_id: reviewId }).del();
module.exports = {
    getReviewsByMovieId,
    getReviewById,
    updateReviewById,
    deleteReviewById
}
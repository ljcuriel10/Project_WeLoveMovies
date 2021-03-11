const ReviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const treeize = require("../utils/treeize");

async function reviewExists(req, res, next) {
    const error = { status: 404, message: `Review cannot be found.` };
    const { reviewId } = req.params;
   
    if (!reviewId) return next(error);
  
   let review = await ReviewsService.getReviewById(reviewId)
   
   
   if(!review) return next(error);
   res.locals.review = review;
   next();
  }

async function read(req, res, next) {
    const { movieId } = req.params;
    
    let reviews = await ReviewsService.getReviewsByMovieId(movieId);
    
    reviews = treeize(reviews);
    
    if (reviews instanceof Error) return next({ message: reviews.message })
    
    
    res.json({ data: reviews});
}

async function update(req, res, next) {
    const {review } = res.locals;
    const {reviewId} = req.params;

    const updatedReview = {...review, ...req.body.data };
    let data = await ReviewsService.updateReviewById(reviewId, updatedReview)
    data = treeize(data)
    if (data instanceof Error) return next({ message: data.message })
    res.json({ data });
}

async function destroy(req, res, next) {
    const { review } = res.locals;
    await ReviewsService.deleteReviewById(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    read: [asyncErrorBoundary(read)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}
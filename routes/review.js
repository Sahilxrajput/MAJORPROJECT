const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLogedIn, isReviewAuthor } = require("../middleware"); 
const Review = require("../models/review");
const Listing = require("../models/listing");
const reviewController = require("../controllers/review");


//Post review Route
router.post("/",isLogedIn  ,validateReview, wrapAsync(reviewController.newReview));

//Delete review Route

router.delete("/:reviewId",isLogedIn,isReviewAuthor  ,wrapAsync(reviewController.destroyReview));

module.exports = router;
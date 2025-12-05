const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressError.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewCOntroller = require("../controllers/reviews.js");

// post route
router.post('/', isLoggedIn, validateReview, wrapAsync(reviewCOntroller.createReview));

//delete route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviewCOntroller.destroyReview));

module.exports = router;
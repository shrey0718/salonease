const Review = require("../models/Review");

/* ADD REVIEW */

exports.addReview = async (req, res) => {

  try {

    console.log("REVIEW RECEIVED:", req.body);

    const { productId, productName, name, rating, comment } = req.body;

    const review = new Review({
      productId,
      productName,
      name,
      rating,
      comment,
      date: new Date()
    });

    const savedReview = await review.save();

    console.log("REVIEW SAVED:", savedReview);

    res.json(savedReview);

  } catch (error) {

    console.log("Review save error:", error);
    res.status(500).json(error);

  }

};



/* GET REVIEWS */

exports.getReviews = async (req, res) => {

  try {

    const reviews = await Review.find({
      productId: req.params.productId
    }).sort({ date: -1 });

    res.json(reviews);

  } catch (error) {

    console.log(error);
    res.status(500).json(error);

  }

};
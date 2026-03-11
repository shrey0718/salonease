const mongoose = require("mongoose");
const Product = require("../models/Product");
const Review = require("../models/Review");

mongoose.connect("mongodb://127.0.0.1:27017/salonease");

const names = [
  "Riya","Sneha","Anita","Kavya","Neha","Pooja",
  "Isha","Megha","Aarti","Divya","Pallavi","Shreya"
];

const comments = [
  "Amazing quality, loved it!",
  "Totally worth the price.",
  "Very smooth and easy to apply.",
  "Packaging is very nice.",
  "Perfect for everyday use.",
  "Highly recommended!",
  "Good product for the price.",
  "Really impressed with the quality.",
  "Color is beautiful.",
  "Will definitely buy again."
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomRating() {
  return Math.floor(Math.random() * 2) + 4; 
}

async function seedReviews() {

  try {

    const products = await Product.find();

    await Review.deleteMany();

    let reviews = [];

    products.forEach(product => {

      for(let i=0;i<3;i++){

        reviews.push({

          productId: product._id,
          productName: product.name,
          name: randomItem(names),
          rating: randomRating(),
          comment: randomItem(comments)

        });

      }

    });

    await Review.insertMany(reviews);

    console.log("Reviews inserted successfully!");

    process.exit();

  } catch (err) {

    console.log(err);
    process.exit();

  }

}

seedReviews();
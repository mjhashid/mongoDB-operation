// To get the price from 15 and above and should include by in the name..

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongodb-exercises");

// Creating a schema..
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

// Creating a Course class..

const Course = mongoose.model("Course", courseSchema);

// Filtering the Courses...
async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price")
    .select("name author price");
}

// Running the result...
async function run() {
  const result = await getCourses();
  console.log(result);
}
run();

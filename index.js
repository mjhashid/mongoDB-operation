const mongoose = require("mongoose");
// Connecting the mongoose to MongoDB..
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB.."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Creating a schema..
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

//Creating a class..
let Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  // Compiling using a model by using the Course class..
  const course = new Course({
    name: "Angular Course",
    author: "Hashid",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 15,
  });

  // Saving a Document
  const result = await course.save();
  console.log(result);
}

// Querying Document using the Course class created...
async function getCourses() {
  // Comparison operator in MongoDB..
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte(greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  // Logical Operator in MongoDB..
  //or
  //and
  const courses = await Course.find({ author: "Hashid", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1 }); // Adding filter..
    // Using Counting...
    .count();
  console.log(courses);
}
getCourses();

// Using regular expression..

//Start with Hashid
// this is achieved by using the caret pattern
// const course = await Course.find({ author: /^Hashid/ })

// End with Adinoyi

// This is achieved by using the dollar sign
// .find({ author: /Adinoyi$/i }) // adding i to make it case insensitive.

// Contain Hashid..

// this is achieved by using .*
// .find({ author: /.*Hashid.*/i });

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongodb-exercises");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  try {
    return await Course.find({ isPublished: true })
      .or([{ tags: "frontend" }, { tags: "backend" }])
      .sort("-price")
      .select("name author price");
  } catch (err) {
    console.log("Error:", err);
  }
}

async function run() {
  try {
    const result = await getCourses();
    console.log(result);
  } catch (err) {
    console.log("Error:", err);
  }
}
run();

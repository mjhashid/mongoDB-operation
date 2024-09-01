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
  const course = new Course({
    name: "Angular Course",
    author: "Hashid",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 15,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // inserting Pagination..
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: "Hashid", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// Approaches in updating Document in MongoDB..
async function updateCourse(id) {
  // First approach: Query first
  // findById()
  // Modify its properties
  // save()
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "Another author";

  const result = await course.save();
  console.log(result);
}
updateCourse(1);

async function updateSecondApproach(id) {
  // Second approach: Update first
  // Update directly
  // Optionally: get the updated document

  //   const result = await Course.update(
  //     { _id: id },
  //     { $set: { author: "Mj", isPublished: false } }
  //   );
  //   console.log(result);

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Babel",
        isPublished: true,
      },
    },
    { new: true }
  );
  console.log(course);
}

updateSecondApproach(222);

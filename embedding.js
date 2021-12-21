const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    author: {
      type: authorSchema,
    },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  //Use unset property to remove the author
  // const course = await Course.findByIdAndUpdate(
  //   courseId,
  //   {
  //     $unset: {
  //       'author': '',
  //     },
  //   },
  //   {new: true}
  // );
  const course = await Course.findByIdAndUpdate(
    courseId,
    {
      $set: {
        'author.name': 'John Smith',
      },
    },
    {new: true}
  );
  console.log(course);
}
updateAuthor('61c1d4fb6ce617dab08f3bcb');
// createCourse('Node Course', new Author({ name: 'Mosh' }));

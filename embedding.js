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
    authors: {
      type: [authorSchema],
    },
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
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
    { new: true }
  );
  console.log(course);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
removeAuthor('61c1d8a5861e47c0158c8a16', '61c1d8a5861e47c0158c8a15');

// addAuthor(
//   '61c1d8a5861e47c0158c8a16',
//   new Author({ name: 'Shashwat Kumar Singh' })
// );
// updateAuthor('61c1d4fb6ce617dab08f3bcb');
// createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({name: 'Shashwat'})]);

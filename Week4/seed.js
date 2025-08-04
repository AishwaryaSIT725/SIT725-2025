import mongoose from 'mongoose';
import Project from './models/project.js';

const projects = [
  {
    title: "Kitten",
    image: "images/kitten.jpg",
    link: "About Kitten ",
    description: "Demo description about kitten "
  },
  {
    title: "Kitten 2",
    image: "images/kitten-2.jpg",
    link: "About Kitten 2",
    description: "Demo description about kitten 2"
  },
  {
    title: "Kitten 3",
    image: "images/kitten-3.jpg",
    link: "About Kitten 3",
    description: "Demo description about kitten 3"
  },
  {
    title: "Kitten 4",
    image: "images/kitten-4.jpg",
    link: "About Kitten 4",
    description: "Demo description about kitten 4"
  }
];

try {
  await mongoose.connect('mongodb+srv://sit725user:sit725pass@cluster0.0nqz3m8.mongodb.net/myprojectDB');
  console.log(" Connected to MongoDB Atlas");

  // Optional: Clear existing records to prevent duplicates
  await Project.deleteMany({});

  // Insert all kitten data
  await Project.insertMany(projects);
  console.log(" All 4 kitten projects inserted successfully!");
} catch (err) {
  console.error(" Error inserting projects:", err);
} finally {
  mongoose.connection.close();
}

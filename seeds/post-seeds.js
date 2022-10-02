const { Post } = require('../models');

const postData = [
  {
    title: "Coding for the beginner",
    blog_contents: "Knowing where to start is the hard part.",
    user_id: "1"
  },
  {
    title: "Coding websites",
    blog_contents: "Have you heard MDN?",
    user_id: "2"
  },
  {
    title: "Coding Tools",
    blog_contents: "VS Code is your new best friend",
    user_id: "3"
  },
  {
    title: "Managing your time",
    blog_contents: "Creating a schedule to get your work done is probably best.",
    user_id: "4"
  },


];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
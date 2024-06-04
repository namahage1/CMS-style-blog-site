const { Comment } = require('../models');

const commentdata = [
  {
    user_id: 1,
    blog_id: 3,
    content: 'This is a comment'

  },
  {
    user_id: 2,
    blog_id: 1,
    content: 'This is another comment'
  }

];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;

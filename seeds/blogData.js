const { Blog } = require('../models');

const blogdata = [
  {
    title: 'Why MVC is so important',
    user_id: 1,
    content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.'
    
  },
  {
    title: 'Authentication vs. Authorization',
    user_id: 1,
    content: 'There is difference between anthentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to system.'
    
  },
  {
    title: 'Object-Relational Mapping',
    user_id: 2,
    content: 'I have really loved learning about ORMs. Its really simplified the way I create queries in SQL!'
  }

];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;

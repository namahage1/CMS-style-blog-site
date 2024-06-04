const { User } = require('../models');

const userdata = [
  {
    username: 'testuser1',
    email: 'test1@user.com',
    password: 'password'
  },
  {
    username: 'testuser2',
    email: 'test2@user.com',
    password: 'password'
  },
];

const seedUser = () => User.bulkCreate(userdata, {
  individualHooks: true
});

module.exports = seedUser;

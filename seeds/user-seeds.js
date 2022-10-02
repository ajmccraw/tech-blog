const { User } = require('../models');

const userData = [
  {
    username: "Michael Scott",
    email: "michaelscott@gmail.com",
    password: "password"
  },
  {
    username: "Dwight Schrute",
    email: "dwightschrute@yahoo.com",
    password: "password1"
  },
  {
    username: "Pam Beesly",
    email: "pbeesly@hotmail.com",
    password: "password2"
  },
  {
    username: "Jan Levinson",
    email: "jlevinson@gmail.com",
    password: "password3"
  },


];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;
const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await Thought.deleteMany({});

  await User.deleteMany({});

  const users = [
    {
      username: 'Tim',
      email: 'tim@email.com',
    },
    {
      username: 'Kim',
      email: 'kim@email.com',
    },
  ];
  
  await User.collection.insertMany(users);

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

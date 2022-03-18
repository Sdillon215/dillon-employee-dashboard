const faker = require('faker');

const db = require('../config/connection');
const { Sorder, Porder, Product, Department, User } = require('../models');

db.once('open', async () => {
  await Sorder.deleteMany({});
  await Porder.deleteMany({});
  await Product.deleteMany({});
  // await Department.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    if (i % 2 == 0) {
      var username = 'Sales' + i;
      var dept = 'Sales'
    } else {
      username = 'Buyer' + i;
      dept = 'Buyer'
    }
    const email = faker.internet.email(username);
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();
    const password = 'password';

    userData.push({ dept, username, firstName, lastName, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // // create departments
  // const depData = [];
  // const dep = ['Fresh Cut', 'Plant Kingdom', 'Supply'];

  // for (let i = 0; i < dep.length; i += 1) {
  //     const name = dep[i];
  //     depData.push({ name });
  // };

  // const createdDeps = await Department.collection.insertMany(depData);

  // create  plant kingdom products
const pk = [
  'Aglaonema Chinese Evergreen',
  'Air Plant Nautilus Shell hanging',
  'Airplants Size Med. PK4',
  'Tropiflora in Metal Cone',
  '4" Alocasia Bambino',
  '6" Anthurium'
];
const pkData = [];
for (let i = 0; i < pk.length; i += 1) {
  const name = pk[i];
  const description = 'Potted Plants';
  const image = 'image.png';
  const price = Math.floor((Math.random() * 50) + 1);
  const quantity = Math.floor((Math.random() * 70) + 1);
  const department = '6233e7bc68dd8e4998b801f7';
  pkData.push({ name, description, image, price, quantity, department });
}

const plantData = await Product.collection.insertMany(pkData);

  // create  Fresh cut products
  const fc = [
    'Alstroemeria, Lavender',
    'Anthurium, Red, 5st/bu',
    'Matsumoto Asters, Pink',
    'Bird of Paradise',
    'Carnation, Cream',
    'Rose, Black Baccara, 40cm'
  ];
  const freshData = [];
  for (let i = 0; i < pk.length; i += 1) {
    const name = fc[i];
    const description = 'Fresh Flowers';
    const image = 'image.png';
    const price = Math.floor((Math.random() * 50) + 1);
    const quantity = Math.floor((Math.random() * 70) + 1);
    const department = '6233e7bc68dd8e4998b801f6';
    freshData.push({ name, description, image, price, quantity, department });
  }
  
  const fcData = await Product.collection.insertMany(freshData);

  // create  Fresh cut products
  const sup = [
    'Ribbons',
    'Wreaths',
    'Vase',
    'Wood Cube, 5", Natural',
    'Cube, 5" Galvanized Metal',
    'Veranda Pot/Stand, 4.75" Tan'
  ];
  const supData = [];
  for (let i = 0; i < pk.length; i += 1) {
    const name = sup[i];
    const description = 'Floral Decorations';
    const image = 'image.png';
    const price = Math.floor((Math.random() * 50) + 1);
    const quantity = Math.floor((Math.random() * 70) + 1);
    const department = '6233e7bc68dd8e4998b801f8';
    supData.push({ name, description, image, price, quantity, department });
  }
  
  const supplyData = await Product.collection.insertMany(supData);
//   // create friends
//   for (let i = 0; i < 100; i += 1) {
//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { _id: userId } = createdUsers.ops[randomUserIndex];

//     let friendId = userId;

//     while (friendId === userId) {
//       const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//       friendId = createdUsers.ops[randomUserIndex];
//     }

//     await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
//   }

//   // create thoughts
//   let createdThoughts = [];
//   for (let i = 0; i < 100; i += 1) {
//     const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { username, _id: userId } = createdUsers.ops[randomUserIndex];

//     const createdThought = await Thought.create({ thoughtText, username });

//     const updatedUser = await User.updateOne(
//       { _id: userId },
//       { $push: { thoughts: createdThought._id } }
//     );

//     createdThoughts.push(createdThought);
//   }

//   // create reactions
//   for (let i = 0; i < 100; i += 1) {
//     const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { username } = createdUsers.ops[randomUserIndex];

//     const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
//     const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

//     await Thought.updateOne(
//       { _id: thoughtId },
//       { $push: { reactions: { reactionBody, username } } },
//       { runValidators: true }
  //   );
  // }

  console.log('all done!');
  process.exit(0);
});
const faker = require('faker');

const db = require('../config/connection');
const { Sorder, Porder, Product, Department, User } = require('../models');

db.once('open', async () => {
  await Porder.deleteMany({});
  await Sorder.deleteMany({});
  await Product.deleteMany({});
  await Department.deleteMany({});
  await User.deleteMany({});

  // create departments
  const depData = [];
  const dep = ['Fresh Cut', 'Plant Kingdom', 'Supply'];
  for (let i = 0; i < dep.length; i += 1) {
    const name = dep[i];
    depData.push({ name });

  };

  const createdDeps = await Department.collection.insertMany(depData);

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
    const unitPrice = Math.random() * (50 - 5 + 1) + 5;
    const name = pk[i];
    const description = 'Potted Plants';
    const department = 'Plant Kingdom';
    const image = 'image.png';
    const price = unitPrice.toFixed(2);
    const quantity = 0;
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
    const unitPrice = Math.random() * (50 - 5 + 1) + 5;
    const name = fc[i];
    const description = 'Fresh Flowers';
    const department = 'Fresh Cut';
    const image = 'image.png';
    const price = unitPrice.toFixed(2);
    const quantity = 0;
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
    const unitPrice = Math.random() * (50 - 5 + 1) + 5;
    const name = sup[i];
    const description = 'Floral Decorations';
    const department = 'Supply';
    const image = 'image.png';
    const price = unitPrice.toFixed(2);
    const quantity = 0;
    supData.push({ name, description, image, price, quantity, department });
  }

  const supplyData = await Product.collection.insertMany(supData);

  // pushing products to associated departments
  const productDep = await Department.find();
  for (let i = 0; i < productDep.length; i += 1) {
    if (productDep[i].name === 'Supply') {
      const products = await Product.find({ department: 'Supply' });
      await Department.findOneAndUpdate(
        { name: 'Supply' },
        { $push: { products: products } }
      );
    }
    if (productDep[i].name === 'Fresh Cut') {
      const products = await Product.find({ department: 'Fresh Cut' });
      await Department.findOneAndUpdate(
        { name: 'Fresh Cut' },
        { $push: { products: products } }
      );
    }
    if (productDep[i].name === 'Plant Kingdom') {
      const products = await Product.find({ department: 'Plant Kingdom' });
      await Department.findOneAndUpdate(
        { name: 'Plant Kingdom' },
        { $push: { products: products } }
      );
    }
  }

  // create purchase orders
  const purchaseOrderDates = [
    '2021, 01, 01',
    '2021, 02, 01',
    '2021, 03, 01',
    '2021, 04, 01',
    '2021, 05, 01',
    '2021, 06, 01',
    '2021, 07, 01',
    '2021, 08, 01',
    '2021, 09, 01',
    '2021, 10, 01',
    '2021, 11, 01',
    '2021, 12, 01'
  ];

  const PoData = [];
  const SoData = [];
  const depIds = await Department.find();
  for (let i = 0; i < purchaseOrderDates.length; i += 1) {
    const depId = depIds[Math.floor(Math.random() * depIds.length)];
    const prodId = depId.products[Math.floor(Math.random() * depId.products.length)];
    const prodInfo = await Product.findById(prodId);
    const username = 'Sean_sendz';
    const purchaseDate = purchaseOrderDates[i];
    const departmentId = depId;
    const productId = prodId;
    const productName = prodInfo.name;
    const quantity = Math.floor(Math.random() * (3000 - 2000 + 1)) + 500;
    const increment = Math.abs(quantity) * +1;
    const updateQuantity = await Product.findByIdAndUpdate(
      { _id: prodId },
      { $inc: { quantity: increment } }
    );
    const unitPrice = prodInfo.price;
    const prodTotal = quantity * unitPrice;
    const total = prodTotal.toFixed(2);
    PoData.push({ username, purchaseDate, productId, departmentId, productName, quantity, unitPrice, total });

    // Sales order
    const saleDate = purchaseDate;
    const saleQuan = quantity * .8;
    const salePerc = unitPrice * .4;
    const salePrice = salePerc + unitPrice;
    const saleUnitPrice = salePrice.toFixed(2);
    const saleQuantity = saleQuan.toFixed();
    const decrement = Math.abs(saleQuantity) * -1;
    const updateSaleQuantity = await Product.findByIdAndUpdate(
      { _id: prodId },
      { $inc: { quantity: decrement } }
    );
    const saleTotal = saleUnitPrice * saleQuantity;
    SoData.push({ username, saleDate, productId, departmentId, productName, quantity: saleQuantity, salePrice: saleUnitPrice, total: saleTotal });

  }
  const newPorder = await Porder.collection.insertMany(PoData);
  const getPorders = await Porder.find();
  for (let i = 0; i < getPorders.length; i += 1) {
    await Department.findByIdAndUpdate(
      { _id: getPorders[i].departmentId},
      { $push: { porders: getPorders[i]._id}}
      );
  }
  
  const newSorder = await Sorder.collection.insertMany(SoData);
  const getSorders = await Sorder.find();
  for (let i = 0; i < getSorders.length; i += 1) {
    await Department.findByIdAndUpdate(
      { _id: getSorders[i].departmentId},
      { $push: { sorders: getSorders[i]._id}}
    )
  }

  // create sales order
  // const saleOrderDates = [
  //   '2021, 01, 01',
  //   '2021, 02, 01',
  //   '2021, 03, 01',
  //   '2021, 04, 01',
  //   '2021, 05, 01',
  //   '2021, 06, 01',
  //   '2021, 07, 01',
  //   '2021, 08, 01',
  //   '2021, 09, 01',
  //   '2021, 10, 01',
  //   '2021, 11, 01',
  //   '2021, 12, 01'
  // ]

  // const soData = [];
  // const depIds = await Department.find();
  // for (let i = 0; i < purchaseOrderDates.length; i += 1) {
  //   const depId = depIds[Math.floor(Math.random() * depIds.length)];
  //   const prodId = depId.products[Math.floor(Math.random() * depId.products.length)];
  //   const prodInfo = await Product.findById(prodId);
  //   const username = 'Sean_sendz';
  //   const purchaseDate = purchaseOrderDates[i];
  //   const departmentId = depId;
  //   const productId = prodId;
  //   const productName = prodInfo.name;
  //   const quantity = Math.floor(Math.random() * (3000 - 2000 + 1)) + 500;
  //   const increment = Math.abs(quantity) * +1;
  //   const updateQuantity = await Product.findByIdAndUpdate(
  //     { _id: prodId },
  //     { $inc: { quantity: increment } }
  //   );
  //   const unitPrice = prodInfo.price;
  //   const prodTotal = quantity * unitPrice;
  //   const total = prodTotal.toFixed(2);
  //   PoData.push({ username, purchaseDate, productId, departmentId, productName, quantity, unitPrice, total });
  // }

  // const newPorder = await Porder.collection.insertMany(PoData);
  console.log('all done!');
  process.exit(0);
});
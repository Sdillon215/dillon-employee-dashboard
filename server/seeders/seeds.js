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
    {name: 'Aglaonema Chinese Evergreen 4in', unitPrice: '13.65', image: 'aglaonema.jpg'},
    {name: 'Air Plant Nautilus Shell hanging', unitPrice: '15.95', image: 'nautilus-shell.jpg'},
    {name : 'Tropiflora in Metal Cone', unitPrice: '15.12', image: 'tropiflora.jpg'},
    {name: 'Alocasia, Ivory Coast', unitPrice: '14.95', image: 'alocasia.jpg'},
    {name: 'Anthurium 6in', unitPrice: '13.95', image: 'anthurium.jpg'},
    {name: 'Cactus 4in', unitPrice: '14.20', image: 'cactus.jpg'}
  ];
  const pkData = [];
  for (let i = 0; i < pk.length; i += 1) {
    const name = pk[i].name;
    const description = 'Potted Plants';
    const department = 'Plant Kingdom';
    const image = pk[i].image;
    const price = pk[i].unitPrice;
    pkData.push({ name, description, image, price, department });
  }

  const plantData = await Product.collection.insertMany(pkData);




  // create  Fresh cut products
  const fc = [
    {name: 'Lily, Dillon Grown, Assorted, 1-2 Blooms', unitPrice: '14.95', image: 'lily.jpg'},
    {name: 'Gerbera, Acapulco, Yellow/Orange, Dark Center', unitPrice: '14.49', image: 'gerbera.jpg'},
    {name : 'Tulips, Red/White', unitPrice: '13.50', image: 'tulip.jpg'},
    {name: 'Aspidistra, Green', unitPrice: '13.95', image: 'aspid.jpg'},
    {name: 'Rose, Amsterdam, 40cm', unitPrice: '14.15', image: 'rose-amsterdam.jpg'},
    {name: 'Rose, Metallic Purple', unitPrice: '15.85', image: 'rose-purple.jpg'}
  ];
  const freshData = [];
  for (let i = 0; i < fc.length; i += 1) {
    const name = fc[i].name;
    const description = 'Fresh Flowers';
    const department = 'Fresh Cut';
    const image = fc[i].image;
    const price = fc[i].unitPrice;
    const invQuantity = 0;
    freshData.push({ name, description, image, price, invQuantity, department });
  }

  const fcData = await Product.collection.insertMany(freshData);




  // create  Supply products
  const sup = [
    {name: 'Wood Cube, 5in, Natural', unitPrice: '13.75', image: 'cube.jpg'},
    {name: 'Oasis Floracage, Grande', unitPrice: '14.00', image: 'oasis.jpg'},
    {name : '8in Rose Vase, clear glass', unitPrice: '15.45', image: 'rose-vase.jpg'},
    {name: 'Spanish Moss, Natural', unitPrice: '14.70', image: 'moss.jpg'},
    {name: 'Tia Hanging Basket, 7.25"', unitPrice: '14.45', image: 'basket.jpg'},
    {name: 'Rooney Pot, 4.5in Tan/Cement', unitPrice: '15.30', image: 'pot.jpg'}
  ];
  const supData = [];
  for (let i = 0; i < sup.length; i += 1) {
    const name = sup[i].name;
    const description = 'Floral Decorations';
    const department = 'Supply';
    const image = sup[i].image;
    const price = sup[i].unitPrice;
    const invQuantity = 0;
    supData.push({ name, description, image, price, invQuantity, department });
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





  // create purchase orders shared with sale orders
  const purchaseOrderDates = [
    // '2021, 10, 01',
    // '2021, 10, 02',
    // '2021, 10, 03',
    // '2021, 10, 05',
    // '2021, 10, 07',
    // '2021, 10, 09',
    // '2021, 10, 10',
    // '2021, 10, 11',
    // '2021, 10, 15',
    // '2021, 10, 16',
    // '2021, 10, 18',
    // '2021, 10, 19',
    // '2021, 10, 21',
    // '2021, 10, 22',
    // '2021, 10, 24',
    // '2021, 10, 25',
    // '2021, 10, 28',
    // '2021, 11, 01',
    // '2021, 11, 02',
    // '2021, 11, 03',
    // '2021, 11, 05',
    // '2021, 11, 07',
    // '2021, 11, 09',
    // '2021, 11, 10',
    // '2021, 11, 11',
    // '2021, 11, 15',
    // '2021, 11, 16',
    // '2021, 11, 18',
    // '2021, 11, 19',
    // '2021, 11, 21',
    // '2021, 11, 22',
    // '2021, 11, 24',
    // '2021, 11, 25',
    // '2021, 11, 28',
    // '2021, 12, 01',
    // '2021, 12, 02',
    // '2021, 12, 03',
    // '2021, 12, 05',
    // '2021, 12, 07',
    // '2021, 12, 09',
    // '2021, 12, 10',
    // '2021, 12, 11',
    // '2021, 12, 15',
    // '2021, 12, 16',
    // '2021, 12, 18',
    // '2021, 12, 19',
    // '2021, 12, 21',
    // '2021, 12, 22',
    // '2021, 12, 24',
    // '2021, 12, 25',
    // '2021, 12, 28',
    // '2022, 01, 01',
    // '2022, 01, 02',
    // // '2022, 01, 03',
    // '2022, 01, 04',
    // '2022, 01, 05',
    // // '2022, 01, 06',
    // '2022, 01, 07',
    // '2022, 01, 08',
    // // '2022, 01, 09',
    // '2022, 01, 10',
    // '2022, 01, 11',
    // // '2022, 01, 12',
    // '2022, 01, 13',
    // '2022, 01, 14',
    // // '2022, 01, 15',
    // '2022, 01, 16',
    // '2022, 01, 17',
    // // '2022, 01, 18',
    // '2022, 01, 19',
    // '2022, 01, 21',
    // // '2022, 01, 22',
    // '2022, 01, 24',
    // '2022, 01, 25',
    // // '2022, 01, 28',
    // '2022, 02, 01',
    // '2022, 02, 02',
    // // '2022, 02, 03',
    // '2022, 02, 04',
    // '2022, 02, 05',
    // // '2022, 02, 06',
    // '2022, 02, 07',
    // '2022, 02, 08',
    // // '2022, 02, 09',
    // '2022, 02, 10',
    // '2022, 02, 11',
    // // '2022, 02, 12',
    // '2022, 02, 13',
    // '2022, 02, 14',
    // // '2022, 02, 15',
    // '2022, 02, 16',
    // '2022, 02, 17',
    // // '2022, 02, 18',
    // '2022, 02, 19',
    // '2022, 02, 21',
    // // '2022, 02, 22',
    // '2022, 02, 24',
    // '2022, 02, 25',
    // '2022, 02, 28',
    '2022, 03, 01',
    '2022, 03, 02',
    // '2022, 03, 03',
    '2022, 03, 04',
    '2022, 03, 05',
    // '2022, 03, 06',
    '2022, 03, 07',
    '2022, 03, 08',
    // '2022, 03, 09',
    '2022, 03, 10',
    '2022, 03, 11',
    // '2022, 03, 12',
    '2022, 03, 13',
    '2022, 03, 14',
    // '2022, 03, 15',
    '2022, 03, 16',
    '2022, 03, 17',
    // '2022, 03, 18',
    '2022, 03, 19',
    '2022, 03, 21',
    // '2022, 03, 22',
    '2022, 03, 24',
    '2022, 03, 25',
    '2022, 03, 28',
    '2022, 04, 01',
    '2022, 04, 02',
    // '2022, 04, 03',
    '2022, 04, 04',
    '2022, 04, 05',
    '2022, 04, 06',
    '2022, 04, 07',
    '2022, 04, 08',
   
  ];

  const saleOrderDates = [];

  // purchase order seed
  const depIds = await Department.find();
  for (let i = 0; i < purchaseOrderDates.length; i += 1) {
    const PoData = [];
    const porderItems = [];
    const depId = depIds[Math.floor(Math.random() * depIds.length)];
    const prodId = depId.products[Math.floor(Math.random() * depId.products.length)];
    const prodInfo = await Product.findById(prodId);
    const purchaseDate = purchaseOrderDates[i];
    const departmentId = depId._id;
    const name = prodInfo.name;
    const quantity = Math.floor(Math.random() * (11000 - 10000 + 1)) + 10000;
    const increment = Math.abs(quantity) * +1;
    const updateQuantity = await Product.findByIdAndUpdate(
      { _id: prodId },
      { $inc: { invQuantity: increment } }
    );
    const price = prodInfo.price * .6;
    const unitPrice = price.toFixed(2);
    const prodTotal = quantity * unitPrice;
    const orderTotal = prodTotal.toFixed(2);
    const productTotal = orderTotal;
    porderItems.push({ productId: prodId, departmentId, name, quantity, unitPrice, productTotal });
    saleOrderDates.push({ purchaseDate, departmentId, prodId, quantity, unitPrice});
    PoData.push({ purchaseDate, departmentId, orderTotal, porderItems });
    const newPorder = await Porder.collection.insertMany(PoData);
  }
  const getPorders = await Porder.find();
  for (let i = 0; i < getPorders.length; i += 1) {
    const order = getPorders[i];
    await Department.findByIdAndUpdate(
      { _id: order.departmentId },
      { $push: { porders: order._id } }
    );
  }


// Sales Order seed
  for (let i = 0; i < saleOrderDates.length; i += 1) {
    const saleItems = [];
    const SoData = [];
    const prodId = saleOrderDates[i].prodId;
    const prodInfo = await Product.findById(prodId);
    const saleDate = saleOrderDates[i].purchaseDate;
    const departmentId = saleOrderDates[i].departmentId;
    const name = prodInfo.name;
    const saleQuantity = saleOrderDates[i].quantity * .9;
    const quantity = saleQuantity.toFixed(0);
    const unitPrice = prodInfo.price;
    const decrement = Math.abs(quantity) * -1;
    const updateSaleQuantity = await Product.findByIdAndUpdate(
      { _id: prodId },
      { $inc: { invQuantity: decrement } }
    );
    const total = unitPrice * quantity;
    const saleTotal = total.toFixed(2);
    saleItems.push({ productId: prodId, departmentId, name, quantity, unitPrice, productTotal: saleTotal });
    SoData.push({ departmentId, saleDate, saleTotal, saleItems });
    const newSorder = await Sorder.collection.insertMany(SoData);
  }
  
  const getSorders = await Sorder.find();
  for (let i = 0; i < getSorders.length; i += 1) {
    const sale = getSorders[i];
    await Department.findByIdAndUpdate(
      { _id: sale.departmentId },
      { $push: { sorders: sale._id } }
    )
  }

  console.log('all done!');
  process.exit(0);
});
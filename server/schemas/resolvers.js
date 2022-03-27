const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Department, Sorder, Porder } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async () => {
            return User.find()
                .select('-__v -password');
        },
        departments: async () => {
            return Department.find()
            .populate('products')
            .populate('porders')
            .populate('sorders');
        },
        department: async (parent, { _id }) => {
            return Department.findById(_id)
            .populate('products')
            .populate('porders')
            .populate('sorders');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id);
        },
        products: async () => {
            return await Product.find();
        },
        porders: async () => {
            return await Porder.find();
        },
        sorders: async () => {
            return await Sorder.find();
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addProduct: async (parent, args) => {
            console.log(args);
            const product = await Product.create({ ...args });

            await Department.findByIdAndUpdate(
                { _id: args.departmentId },
                { $push: { products: product._id } },
                { new: true }
            );
            return product;
        },
        addDepartment: async (parent, args) => {
            const department = await Department.create(args);

            return department;
        },
        purchaseOrder: async (parent, args) => {
            const porder = await Porder.create({ ...args });
            const pItemArr = args.porderItems;
            console.log(pItemArr);
            for (let i = 0; i < pItemArr.length; i++) {
                const increment = Math.abs(pItemArr[i].quantity) * +1;
                await Product.findByIdAndUpdate(
                    { _id: pItemArr[i].productId },
                    { $inc: { quantity: increment } }
    
                );
            }

            await Department.findByIdAndUpdate(
                { _id: args.departmentId },
                { $push: { porders: porder._id }},
                { new: true }
            )
            return porder;
        }
    }
};

module.exports = resolvers;
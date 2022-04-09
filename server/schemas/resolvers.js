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
            console.log(args.departmentId);
            const porder = await Porder.create({ ...args });
            const pItemArr = args.porderItems;
            for (let i = 0; i < pItemArr.length; i++) {
                const increment = Math.abs(pItemArr[i].quantity) * +1;
                await Product.findByIdAndUpdate(
                    { _id: pItemArr[i].productId },
                    { $inc: { invQuantity: increment } }
    
                );
            }
            await Department.findByIdAndUpdate(
                { _id: args.departmentId },
                { $addToSet: { porders: {...porder} }},
                { new: true }
            );

            const department = await Department.findById({ _id: args.departmentId })
            .populate('products')
            .populate('porders')
            .populate('sorders');
        console.log(department)
            return department;
        },
        saleOrder: async (parent, args) => {
            const sorder = await Sorder.create({ ...args });
            const sItemArr = args.saleItems;
            for (let i = 0; i < sItemArr.length; i++) {
                const decrement = Math.abs(sItemArr[i].quantity) * -1;
                await Product.findByIdAndUpdate(
                    { _id: sItemArr[i].productId },
                    { $inc: { invQuantity: decrement } }
    
                );
            }

            await Department.findByIdAndUpdate(
                { _id: args.departmentId },
                { $push: { sorders: sorder._id }},
                { new: true }
            )
            return sorder;
        }
    }
};

module.exports = resolvers;
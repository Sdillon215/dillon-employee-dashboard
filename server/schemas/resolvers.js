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
            return Department.find().populate('products');
        },
        department: async () => {
            return Department.findById().populate('products');
        },
        product: async (parent, {_id}) => {
            return await Product.findById(_id);
        },
        products: async () => {
            return await Product.find();
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
                { $addToSet: { products: product._id} }
            );
            return product;
        },
        addDepartment: async (parent, args) => {
            const department = await Department.create(args);

            return department;
        },
        purchaseOrder: async (parent, { args }, context) => {
            if(context.user.Buyer) {
                console.log(context);
                

            }
        }
    }
};

module.exports = resolvers;
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const UserData = await User.findOne({ _id: context.user.id }).select('-__v -password');

                return UserData;
            }

            throw new AuthenticationError('Not logged in');
        },
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
                throw new AuthenticationError('Login information is incorrect');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Login information is incorrect');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user.id },
                    { $addToSet: { savedBooks: body } },
                    { new: true }
                );
                return user;
            }

            throw new AuthenticationError('Not logged in');
        },

        removeBook: async(parent, { bookId }, context ) => {
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId: params.bookId } } },
                    { new: true }
                )
                return user;
            }
            throw new AuthenticationError('Not logged in');
        }

    },
};

module.exports = resolvers;

//https://brainsandbeards.com/blog/part-4-implementing-authentication-and-integrating-with-apollo-client
// login = async (_object, args, context, _information) => {
//     const user = await context.db.query.user(
//       { where: { email: args.email } },
//       ` { id password } `
//     )
//     if (!user) {
//       throw new Error('User not found')
//     }

//     const valid = await bcrypt.compare(args.password, user.password)
//     if (!valid) {
//       throw new Error('Sorry, Wrong password')
//     }

//     const token = jwt.sign({ userId: user.id }, APP_SECRET)

//     return {
//       token,
//       user,
//     }
//   }
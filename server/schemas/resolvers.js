const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            return User.find();
        },

        me: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create({ username, email, password });
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

    }
}


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
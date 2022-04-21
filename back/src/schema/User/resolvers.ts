import type { Resolvers } from "@generated/types";
import { generateJWT } from "@lib/jwt";
import { User, IUser } from "@models/index";
import { AuthenticationError } from "apollo-server-core";
import { hash, compare } from "bcrypt";

export const resolvers: Resolvers = {
  Query: {
    Users: async (_, __) => {
      return await User.find();
    },
    User: async (_, { id }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { name, visa, code, balance } = input;
      const hashedPassword = await hash(code, 10);

      const user: IUser = await User.create({
        name,
        visa,
        code: hashedPassword,
        balance,
      });

      const token = generateJWT({ id: user.id });

      return { user, token };
    },

    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
    deleteAllUsers: async () => {
      await User.deleteMany({});
      return "All users deleted 😐";
    },
    updateUser: async (_, { id, input }) => {
      return await User.findByIdAndUpdate(id, input, { new: true });
    },
    updateBalance: async (_, { id, input }) => {
      return await User.findByIdAndUpdate(id, input, { new: true });
    },
    login: async (_, { input }) => {
      const { visa, code } = input;
      console.log(visa, code);
      
      const user = await User.findOne({ visa });
      if (!user) throw new Error("User not found");

      
      const isValid = await compare(code!, user.code);
      if (!isValid) throw new Error("Invalid credentials");

      const token = generateJWT({ id: user.id });

      return { user, token };
    },
  },
};

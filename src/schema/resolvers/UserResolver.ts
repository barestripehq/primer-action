import { User } from "../types/index";
const users: User[] = [];

// Resolver map
const UserResolver = {
  // Query resolvers
  Query: {
    getUsers: async (parent: any, args: any, context: any): Promise<User[] | []> => {
      return users || [];
    },
    getUser: async (parent: any, args: { id: any; }, context: any): Promise<User | object> => {
      const { id } = args;
      const user = users.find(user => user.id! === id);
      // if(!user) return {};
      return user || {};
    },
  },
  // Mutation resolvers
  Mutation: {
    addUser: async (parent: any, args: { input: any; }, context: any): Promise<User> => {
      const user = args.input;
      users.push(user);
      return user;
    },

    updateUser: async (parent: any, args: { input: any }, context: any): Promise<User | object> => {
      const item = { ...args.input };
      const user = users.findIndex(user => user.id === args.input.id);
      users.splice(user, 1, item);
      return { ...args.input };
    },

    deleteUser: (parent: any, args: { id: any; }, context: any): Promise<string> => {
      const { id } = args;
      const user = users.findIndex(user => user.id === id);
      users.splice(user, 1);
      return id;
    },
  },
};

export default UserResolver;
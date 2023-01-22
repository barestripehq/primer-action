import { Career } from "../types/index";
const careers: Career[] = [];

// Resolver map
const CareerResolver = {
  // Query resolvers
  Query: {
    getCareers: async (parent: any, args: any, context: any): Promise<Career[] | []> => {
      return careers || [];
    },
    getCareer: async (parent: any, args: { id: any; }, context: any): Promise<Career | object> => {
      const { id } = args;
      const career = careers.find(career => career.id! === id);
      // if(!career) return {};
      return career || {};
    },
  },
  // Mutation resolvers
  Mutation: {
    addCareer: async (parent: any, args: { input: any; }, context: any): Promise<Career> => {
      const career = args.input;
      careers.push(career);
      return career;
    },

    updateCareer: async (parent: any, args: { input: any }, context: any): Promise<Career | object> => {
      const item = { ...args.input };
      const career = careers.findIndex(career => career.id === args.input.id);
      careers.splice(career, 1, item);
      return { ...args.input };
    },

    deleteCareer: (parent: any, args: { id: any; }, context: any): Promise<string> => {
      const { id } = args;
      const career = careers.findIndex(career => career.id === id);
      careers.splice(career, 1);
      return id;
    },
  },
};

export default CareerResolver;
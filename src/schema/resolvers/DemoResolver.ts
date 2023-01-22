import { Demo } from "../types/index";
const demos: Demo[] = [];

// Resolver map
const DemoResolver = {
  // Query resolvers
  Query: {
    demos: async (parent: any, args: any, context: any): Promise<Demo[] | []> => {
      return demos || [];
    },
    demo: async (parent: any, args: { demoId: any; }, context: any): Promise<Demo | object> => {
      const { demoId } = args;
      const demo = demos.find(demo => demo.demoId! === demoId);
      // if(!demo) return {};
      return demo || {};
    },
  },
  // Mutation resolvers
  Mutation: {
    addDemo: async (parent: any, args: { input: any; }, context: any): Promise<Demo> => {
      const demo = { id: args.input.demoId, ...args.input };
      demos.push(demo);
      return demo;
    },

    updateDemo: async (parent: any, args: { input: any }, context: any): Promise<Demo | object> => {
      const item = { ...args.input };
      const demo = demos.findIndex(demo => demo.demoId === args.input.demoId);
      demos.splice(demo, 1, item);
      return { ...args.input };
    },

    deleteDemo: (parent: any, args: { demoId: any; }, context: any): Promise<string> => {
      const { demoId } = args;
      const demo = demos.findIndex(demo => demo.demoId === demoId);
      demos.splice(demo, 1);
      return demoId;
    },
  },
};

export default DemoResolver;
import { Subscription } from "../types/index";
const subscriptions: Subscription[] = [];

// Resolver map
const SubscriptionResolver = {
  // Query resolvers
  Query: {
    subscriptions: async (parent: any, args: any, context: any): Promise<Subscription[] | []> => {
      return subscriptions || [];
    },
    subscription: async (parent: any, args: { subscriptionId: any; }, context: any): Promise<Subscription | object> => {
      const { subscriptionId } = args;
      const subscription = subscriptions.find(subscription => subscription.subscriptionId! === subscriptionId);
      return subscription || {};
    },
  },
  // Mutation resolvers
  Mutation: {
    addSubscription: async (parent: any, args: { input: any; }, context: any): Promise<Subscription> => {
      const subscription = { id: args.input.subscriptionId, ...args.input };
      subscriptions.push(subscription);
      // console.log('subscriptions: ', subscriptions);
      return subscription;
    },

    // updateSubscription: async (parent: any, args: { input: any }, context: any): Promise<Subscription | object> => {
    //   const item = { ...args.input };
    //   const subscription = subscriptions.findIndex(subscription => subscription.subscriptionId === args.input.subscriptionId);
    //   subscriptions.splice(subscription, 1, item);
    //   return { ...args.input };
    // },

    // deleteSubscription: (parent: any, args: { subscriptionId: any; }, context: any): Promise<string> => {
    //   const { subscriptionId } = args;
    //   const subscription = subscriptions.findIndex(subscription => subscription.subscriptionId === subscriptionId);
    //   subscriptions.splice(subscription, 1);
    //   return subscriptionId;
    // },
  },
};

export default SubscriptionResolver;
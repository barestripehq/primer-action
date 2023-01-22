import { Contact } from "../types/index";
const contacts: Contact[] = [];

// Resolver map
const ContactResolver = {
  // Query resolvers
  Query: {
    contacts: async (parent: any, args: any, context: any): Promise<Contact[] | []> => {
      return contacts || [];
    },
    contact: async (parent: any, args: { contactId: any; }, context: any): Promise<Contact | object> => {
      const { contactId } = args;
      const contact = contacts.find(contact => contact.contactId! === contactId);
      // if(!contact) return {};
      return contact || {};
    },
  },
  // Mutation resolvers
  Mutation: {
    addContact: async (parent: any, args: { input: any; }, context: any): Promise<Contact> => {
      const contact = { id: args.input.contactId, ...args.input };
      // console.log('contact: ', contact);
      contacts.push(contact);
      return contact;
    },

    updateContact: async (parent: any, args: { input: any }, context: any): Promise<Contact | object> => {
      const item = { ...args.input };
      const contact = contacts.findIndex(contact => contact.contactId === args.input.contactId);
      contacts.splice(contact, 1, item);
      return { ...args.input };
    },

    deleteContact: (parent: any, args: { contactId: any; }, context: any): Promise<string> => {
      const { contactId } = args;
      const contact = contacts.findIndex(contact => contact.contactId === contactId);
      contacts.splice(contact, 1);
      return contactId;
    },
  },
};

export default ContactResolver;
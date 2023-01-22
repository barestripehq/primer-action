import { Blog } from "../types/index";
import blogs from "../database/Blogs";

// Resolver map
const BlogResolver = {
  // Query resolvers
  Query: {
    blogs: async (parent: any, args: any, context: any): Promise<Blog[] | []> => {
      // console.log(blogs);
      return blogs || [];
      // try {
      //   return blogs;
      // } catch (error) {
      //   return  error;
      // }
    },
    blog: async (parent: any, args: { blogId: any; }, context: any): Promise<Blog | object> => {
      const { blogId } = args;
      const blog = blogs.find(blog => blog.blogId! === blogId);
      // if(!blog) return {};
      return blog || {};
    },
  },
  // Mutation resolvers
  Mutation: {
    addBlog: async (parent: any, args: { input: any; }, context: any): Promise<Blog> => {
      const blog = { ...args.input, id: args.input.blogId };
      blogs.push(blog);
      return blog;
    },

    updateBlog: async (parent: any, args: { input: any }, context: any): Promise<Blog | object> => {
      const { blogId } = args.input;
      const item = { ...args.input };
      const blog = blogs.findIndex(blog => blog.blogId === blogId);
      blogs.splice(blog, 1, item);
      return { ...args.input };
    },

    deleteBlog: (parent: any, args: { blogId: any; }, context: any): Promise<string> => {
      const { blogId } = args;
      const blog = blogs.findIndex(blog => blog.blogId === blogId);
      blogs.splice(blog, 1);
      return blogId;
    },
  },
};

// resolverMap.ts
// import { IResolvers } from 'graphql-tools';
// const resolverMap: IResolvers = {
//   Query: {
//     helloWorld(_: void, args: void): string {
//   return `👋 Hello world! 👋`;
//     },
//   },
// };

export default BlogResolver;
// import { FirestoreDataSource, ApolloContext} from "apollo-datasource-firestore";
// // import { ApolloContext } from "apollo-server-express";
// // const Firestore = require('@google-cloud/firestore');
// import { Firestore, CollectionReference } from "@google-cloud/firestore";

// const firestore = new Firestore({
//   projectId: 'YOUR_PROJECT_ID',
//   keyFilename: '/path/to/keyfile.json',
// });

// export interface BlogDoc {
//   // a string id value is required for entities using this library.
//   // It will be used for the firestore document ID but not stored in the document in firestore.
//   readonly id: string
//   readonly collection: 'blogs'
//   title: string,
//   content: string,
//   image_url: string,
//   image_source: string,
//   created_at: string,
//   updated_at: string,
//   published_at: string,
//   isPublished: boolean,
//   blogId: string,
//   userId: string,
//   tags: string[],
// }

// export class BlogDataSource extends FirestoreDataSource<BlogDoc, ApolloContext> {}

// const blogsCollection: CollectionReference<BlogDoc> = firestore.collection('blogs')

// users: new BlogDataSource(blogsCollection)
// // export blogsCollection;


// const blogs: Blog[] = [
//   {
//     id: "d5b463e0-32ec-454f-b8a9-3dee96e7226f",
//     blogId: "d5b463e0-32ec-454f-b8a9-3dee96e7226f",
//     title: "The Living Ocean of New Lemuria",
//     content: "Surviving is usually extremely difficult, especially when nutrients are scarce and you have to choose between growing or reproducing. One species on this planet has developed a nifty method to prepare for this. Once full matured, this species will split into 2 versions of itself and attached to each other, so it's essentially reproducing. Once those 2 are fully grown, they newly grown version will either detach itself if enough nutrients are available or it becomes a storage unit for the original, if nutrients are scarce. If nutrients continue to be scarce, the original will use slowly consume the nutrients in the new version in the hope that new nutrients become available again and it can repeat the cycle.",
//     image_url: "https://res.cloudinary.com/apollographql/image/upload/v1644381344/odyssey/federation-course1/FlyBy%20illustrations/Landscape_4_lkmvlw.png",
//     image_source: "image_source",
//     created_at: "177718530000",
//     updated_at: "177718530000",
//     published_at: "177718530000",
//     isPublished: true,
//     userId: "31ea6b3b-f484-43ea-a192-3e788bd11c8d",
//     tags: ['Tech', 'Privacy', 'Cloud']
//     // tags: [{name: 'Tech'}, {name: 'Privacy'}, {name: 'Data'}, {name: 'Cloud'}]
//   },
//   {
//     id: "dfddecb5-2095-44ef-abab-eced2167df55",
//     blogId: "dfddecb5-2095-44ef-abab-eced2167df55",
//     title: "Vinci",
//     content: "SMany of the creatures on this planet have evolved into gliders, so to speak. Most of the fish and aquatic mammals, despite coming in various shapes and sizes, tend to glide through the water without effort, similar to how manta's glide on Earth. However, the surface species are more astonishing. Similar to the flying squirrels or the vultures of Earth, many of the species on this planet have developed ways to effortlessly move from one place to another by using the winds. But there is one species which shows signs of sentience. These species, a type of bird, love to play and have become masters of flight. Similar to how dolphins play, explore and learn, these species use their intellect and courage to play and sometimes challenge each other to death defying tricks.",
//     image_url: "https://res.cloudinary.com/apollographql/image/upload/v1644381349/odyssey/federation-course1/FlyBy%20illustrations/Landscape_15_tiqel5.png",
//     image_source: "image_source",
//     created_at: "177718530000",
//     updated_at: "177718530000",
//     published_at: "177718530000",
//     isPublished: true,
//     userId: "d761fca6-23da-42b3-b3e8-ae726d372f7e",
//     tags: ['Tech', 'Privacy', 'Cloud']
//     // tags: [{name: 'Tech'}, {name: 'Privacy'}, {name: 'Data'}, {name: 'Cloud'}]
//   },
// ];
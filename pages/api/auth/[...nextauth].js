import NextAuth from 'next-auth';
import { MongoClient } from "mongodb"
import CredentialsProvider from "next-auth/providers/credentials"

import { verifyPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';

export default NextAuth({
  
  providers: [
    CredentialsProvider({
     name: 'Credentials',
     async authorize(credentials, req) {

        const client = await MongoClient.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ckaxj.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`);
        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        console.log(user);

        // If no error and we have user data, return it
        if (isValid) {
            client.close();
            return user;
        }

        // Return null if user data could not be retrieved
        client.close();
        return null;
        
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    //secret: process.env.NEXTAUTH_SECRET,
    //secret: process.env.SECRET,
    //encryption: true,
    jwt: true,
  },
});
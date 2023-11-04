import { verifyPassword } from "@/lib/auth";
import { MongoClient } from "mongodb"

async function handler(req, res){

    const client = await MongoClient.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ckaxj.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`);

    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({
      email: 'athil@dedoit.com',
    });

    console.log(user);

    const isValid = await verifyPassword(
        credentials.password,
        user.password
      );

    res.status(200).json({ message: "save", save: user})

}

export default handler;
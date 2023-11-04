import { MongoClient } from "mongodb"
import { verifyPassword } from "@/lib/auth";
async function handler(req, res){

    if(req.method === "GET"){
        return;
    }

    const client = await connetToDatabase();
    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({
      email: 'athil@dedoit.com',
    });

    console.log(user);

    const isValid = await verifyPassword(
        '12345678',
        user.password
      );

    res.status(200).json({ message: "save", save: isValid})

}

export default handler;
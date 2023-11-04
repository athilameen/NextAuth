import { MongoClient } from "mongodb"

async function connetToDatabase() {

    const connectString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ckaxj.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
        const client = await MongoClient.connect(connectString);
        return client;
    } catch (error) {
        return error;
    }
  
}

export default connetToDatabase;
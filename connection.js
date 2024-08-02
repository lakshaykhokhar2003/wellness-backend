import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {MongoClient, ServerApiVersion} from "mongodb";

dotenv.config();

const uri = process.env.MONGODB_URL

export const initializeConnection =  () => {
    mongoose.connect(uri).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1, strict: true, deprecationErrors: true,
        }
    });

    async function run() {
        try {
            await client.connect();
            await client.db("admin").command({ping: 1});
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            await client.close();
        }
    }

    run().catch(console.dir);
}


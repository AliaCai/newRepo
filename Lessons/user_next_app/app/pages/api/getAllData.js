
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = new MongoClient(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        try {
            await client.connect();
            console.log("Hello");
            res.status(200).json({ message: "Connection successful!" });
            /*
            console.log('RUNNNNNNNNNNNNNNNNN');
            res.status(500).json({ message: "SOMETHING IS HAPPENING" });
            // Choose a name for your database
            const database = client.db("user_data_db");

            // Choose a name for your collection
            const collection = database.collection("user_data_collection");
            //const allData = await collection.find({}).toArray();

            //res.status(200).json(allData);*/
        } catch (error) {
            res.status(500).json({ message: "Something went wrong!" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}
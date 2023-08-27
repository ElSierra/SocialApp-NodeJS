import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.DATABASE_URL as string;

// Replace the following with the specified user you want to monitor changes for

const client = new MongoClient(uri);
export const userCollection = client.db().collection("User");

import { MongoClient } from 'mongodb';

export class MongoHelper {

    public static client: MongoClient;

    public static async connect(url: string | undefined) {

        this.client = new MongoClient(`${url}`);
        await this.client.connect();

    }
}
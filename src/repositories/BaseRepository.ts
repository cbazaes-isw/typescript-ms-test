import { IWrite } from './interfaces/IWrite';
import { IRead } from './interfaces/IRead';

import { MongoClient, Db, Collection, InsertOneResult } from 'mongodb';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T>
{

    public readonly _collection : Collection;

    constructor(db:Db, collectionName: string)
    {
        this._collection = db.collection(collectionName);
    }

    async create(item: T): Promise<Boolean> {

        const result : InsertOneResult = await this._collection.insertOne(item);

        return !!result.insertedId && !!result.insertedId.id;

    }

    update(id: string, item: T): Promise<Boolean> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<Boolean> {
        throw new Error('Method not implemented.');
    }
    find(item: T): Promise<T[]> {
        throw new Error('Method not implemented.');
    }
    finddOne(id: string): Promise<T> {
        throw new Error('Method not implemented.');
    }
    
}
import { Router, Request, Response, NextFunction } from "express";
import { ObjectId } from 'mongodb';
import { MongoHelper } from "../mongo.helper";

const todoRoutes = Router();

const getCollection = () => {
    return MongoHelper.client.db('todo').collection('todos');
};

todoRoutes.get('/todo/:id', async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const collection = getCollection();
    const item = await collection.findOne({ "_id": new ObjectId(id) });

    if (!!item) {
        res.status(404).end();
        return;
    }

    res.status(200).json(item);

});

todoRoutes.get('/todo', async (req: Request, res: Response, next: NextFunction) => {

    const collection = getCollection();
    try {

        const todos = await collection.find({}).toArray();
        const items = todos.map(item => { return { id: item._id, description: item.description } });
        res.status(200).json(items);

    } catch (error) {

        res.status(500).end();
        console.error('Caught error', error);

    }

});

todoRoutes.post('/todo', (req: Request, res: Response, next: NextFunction) => {

    const description = req.body['description'];
    const collection = getCollection();
    collection.insertOne({ description });

    res.end();

});

todoRoutes.put('/todo/:id', async (req: Request, res: Response, next: NextFunction) => {

    const description = req.body['description'];
    const id = req.params.id;

    const collection = getCollection();
    collection.updateOne({ "_id": new ObjectId(id) }, { description });

    res.end();

});

todoRoutes.delete('/todo/:id', (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;

    const collection = getCollection();
    collection.deleteOne({ "_id": new ObjectId(id) });

    res.end();

});

export { todoRoutes };
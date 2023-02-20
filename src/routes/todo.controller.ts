import { Router, Request, Response, NextFunction } from "express";
import { TodoModel } from "../models/todo";

const todoRoutes = Router();

todoRoutes.get('/todo', async (req: Request, res: Response, next: NextFunction) => {

    try {

        const todos = await TodoModel.find({});
        const items = todos.map((item) => { return { id: item._id, description: item.description } });
        res.status(200).json(items);

    } catch (error) {

        res.status(500).end();
        console.error('Caught error', error);

    }

});

todoRoutes.get('/todo/:id', async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;

    try {

        const todo = await TodoModel.findOne({ _id : id });
        console.log({ todo });

        if (todo === null) {
            res.status(404).end();
            return;
        }

        const item = {
            id : todo._id,
            description: todo.description
        }

        res.status(200).json(item);

    } catch (error) {

        console.error(error);
        res.status(500).json(error).end();

    }

});

todoRoutes.post('/todo', async (req: Request, res: Response, next: NextFunction) => {

    const description = req.body['description'];
    const item = new TodoModel({ description });
    await item.save();
    res.end();

});

todoRoutes.put('/todo/:id', async (req: Request, res: Response, next: NextFunction) => {

    const description = req.body['description'];
    const id = req.params.id;
    await TodoModel.findByIdAndUpdate(id, { description });
    res.end();

});

todoRoutes.delete('/todo/:id', async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    await TodoModel.findByIdAndRemove(id);
    res.end();

});

export { todoRoutes };
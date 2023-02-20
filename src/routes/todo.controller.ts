import { Router, Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo.service";

const todoRoutes = Router();
const service = new TodoService();

todoRoutes.get('/todo', async (req: Request, res: Response, next: NextFunction) => {

    try {

        const items = await service.getAll();
        res.status(200).json(items);

    } catch (error) {

        res.status(500).end();
        console.error('Caught error', error);

    }

});

todoRoutes.get('/todo/:id', async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;

    try {

        const todo = await service.getById(id)
        console.log({ todo });

        if (todo === null) {
            res.status(404).end();
            return;
        }

        res.status(200).json(todo);

    } catch (error) {

        console.error(error);
        res.status(500).json(error).end();

    }

});

todoRoutes.post('/todo', async (req: Request, res: Response, next: NextFunction) => {

    const description = req.body['description'];
    await service.create({ description });
    res.end();

});

todoRoutes.put('/todo/:id', async (req: Request, res: Response, next: NextFunction) => {

    const description = req.body['description'];
    const id = req.params.id;
    await service.update(id, { description });
    res.end();

});

todoRoutes.delete('/todo/:id', async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    await service.delete(id);
    res.end();

});

export { todoRoutes };
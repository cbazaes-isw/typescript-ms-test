import { Router, Request, Response, NextFunction } from "express";
import { CafService } from "../services/caf.service";

const cafRoutes = Router();
const service = new CafService();

cafRoutes.get('/caf', async (req: Request, res: Response, next: NextFunction) => {

    try {

        const items = await service.getAll();
        res.status(200).json(items);

    } catch (error) {

        res.status(500).end();
        console.error('Caught error', error);

    }

});

cafRoutes.get('/caf/:id', async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;

    try {

        const caf = await service.getById(id)
        if (caf === null) {
            res.status(404).end();
            return;
        }

        res.status(200).json(caf);

    } catch (error) {

        console.error(error);
        res.status(500).json(error).end();

    }

});

cafRoutes.post('/caf', async (req: Request, res: Response, next: NextFunction) => {

    const base64content = req.body['base64content'];
    await service.create(base64content);
    res.end();

});

cafRoutes.put('/caf/:id', async (req: Request, res: Response, next: NextFunction) => {

    const description = req.body['description'];
    const id = req.params.id;
    await service.update(id, { description });
    res.end();

});

cafRoutes.delete('/caf/:id', async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    await service.delete(id);
    res.end();

});

export { cafRoutes };
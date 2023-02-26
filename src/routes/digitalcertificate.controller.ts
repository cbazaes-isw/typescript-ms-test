import { Router, Request, Response, NextFunction } from "express";
import { DigitalCertificateService } from "../services/digitalcertificate.service";

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const digitalCertificateRoutes = Router();
const service = new DigitalCertificateService();

digitalCertificateRoutes.get('/digitalcertificate', async (req: Request, res: Response, next: NextFunction) => {

    try {

        const items = await service.getAll();
        res.status(200).json(items);

    } catch (error) {

        res.status(500).end();
        console.error('Caught error', error);

    }

});

digitalCertificateRoutes.get('/digitalcertificate/:id', async (req: Request, res: Response, next: NextFunction) => {

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

digitalCertificateRoutes.post('/digitalcertificate', upload.single("certificate"), async (req: Request, res: Response, next: NextFunction) => {

    const content = req.file?.buffer as Buffer;
    const mimeType = req.file?.mimetype as string;
    const password = req.body['password'];
    const legalCode = req.body['legalCode'];
    
    await service.create(legalCode, password, content, mimeType);
    res.end();

});

digitalCertificateRoutes.put('/digitalcertificate/:id', async (req: Request, res: Response, next: NextFunction) => {

    const description = req.body['description'];
    const id = req.params.id;
    await service.update(id, { description });
    res.end();

});

digitalCertificateRoutes.delete('/digitalcertificate/:id', async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    await service.delete(id);
    res.end();

});

export { digitalCertificateRoutes };
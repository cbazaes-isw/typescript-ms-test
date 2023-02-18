// import * as express from 'express';
import express from 'express';
import cors from 'cors';
import * as bodyparser from 'body-parser';
import { requestLoggerMiddeware } from './middleware/request.logger';

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(requestLoggerMiddeware);

app.get('/todo', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res
        .status(200)
        .json([
            { _id: 1, description: "Comprar insecticida" },
            { _id: 2, description: "Comprar aceite de oliva" }
        ]);
})

app.post('/todo', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    console.info(req.body);
    res.end();

});

app.put('/todo/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {

    console.info(req.body);
    console.info(req.params.id);
    res.end();

});

app.delete('/todo/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {

    console.info(req.params.id);
    res.end();

});

export { app };
// import * as express from 'express';
import express from 'express';
import cors from 'cors';
import * as bodyparser from 'body-parser';
import { requestLoggerMiddeware } from './middleware/request.logger';
import { todoRoutes } from './routes/todo.controller';

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(requestLoggerMiddeware);

app.use(todoRoutes);

export { app };
// import * as express from 'express';
import express from 'express';
import cors from 'cors';
import * as bodyparser from 'body-parser';
import { requestLoggerMiddeware } from './middleware/request.logger';
import { todoRoutes } from './routes/todo.controller';
import { cafRoutes } from './routes/caf.controller';
import { digitalCertificateRoutes } from './routes/digitalcertificate.controller';

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(requestLoggerMiddeware);

app.use(todoRoutes);
app.use(cafRoutes);
app.use(digitalCertificateRoutes);

export { app };
import * as http from 'http';
import { app } from './app';
import { MongoHelper } from './mongo.helper';

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT);
server.on('listening', async () => {

    console.info(`Listening on port ${PORT}`);
    try {

        console.info('Connecting to mongodb...');
        await MongoHelper.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.info('Connected to mongodb!');
        
    } catch (err) {

        console.error(err);

    }

});

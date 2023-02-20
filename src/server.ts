import * as http from 'http';
import { app } from './app';
import * as mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(PORT);
server.on('listening', async () => {

    console.info(`Listening on port ${PORT}`);
    
    try {
        
        console.info('Connecting to mongodb...');
        await mongoose.connect(`${process.env.MONGODB_CONNECTIONSTRING}`);
        console.info('Connected to mongodb!')

    } catch (error) {

        console.error(error);
    }

});

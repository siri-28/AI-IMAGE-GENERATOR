import express from 'express';
import * as dotevnv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotevnv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb'}));

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/', async(req,res) => {
    res.send('Hello from DALL-E!');
})

const startServer = async () => {

    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8081, () => console.log('Server has started on port http://localhost:8081'))
    } catch(error){
        console.log(error);
    }
}
startServer();
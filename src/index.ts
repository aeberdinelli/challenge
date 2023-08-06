import express, { Express, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL!;

(async () => {
    await connect(MONGODB_URL);
})();

app.set('etag', false);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.set('Cache-Control', 'no-store');
    next();
});
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
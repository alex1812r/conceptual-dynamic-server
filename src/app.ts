import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { PORT } from './shared/constants';
import { apiRouter } from './shared/api.router';

export const app: Express = express();

app.use(express.json())
app.use(cors())

app.set('PORT', PORT)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api', apiRouter)



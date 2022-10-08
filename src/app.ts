import express, { Express, Request, Response } from 'express';
import { errorHandler } from './middlewares/ErrorHandler';
import Router from './routes';

const app: Express = express();

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to 🎥 API');
});



  /**Routing*/
  app.use('/v1', Router);



app.use(errorHandler);

export default app

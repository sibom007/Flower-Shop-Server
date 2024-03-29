/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import config from './app/config';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: "https://assmient-6-client-side.vercel.app", credentials: true }));

// application routes
app.use('/api', router);

const test = async (req: Request, res: Response) => {
  const a = 'server is runing';
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;

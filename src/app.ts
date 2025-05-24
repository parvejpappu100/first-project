

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewers/globalErrorHandeler';
import notFound from './app/middlewers/notFound';
import router from './app/routes';
const app: Application = express();

// * parsers
app.use(express.json());
app.use(cors());

// * application routes
app.use('/api/v1' , router,);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRout } from './app/modules/product/product.route';
const app: Application = express();

const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', productRout);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());

export default app;

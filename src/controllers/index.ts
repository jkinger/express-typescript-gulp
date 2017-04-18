// Import only what we need from express
import { Router, Request, Response } from 'express';

const index: Router = Router();

/**
 * GET /
 * Home page.
 */
index.get('/', (reg: Request, res: Response) => {
  res.render(
    'index',
    {
      title: 'Home',
      description: 'This is the home description'
    });
});

export default index;

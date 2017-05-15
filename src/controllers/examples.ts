// Import only what we need from express
import { Router, Request, Response } from 'express';

const examples: Router = Router();

/**
 * GET /
 * Examples page.
 */
examples.get('/examples', (reg: Request, res: Response) => {
  res.render(
    'examples',
    {
      title: 'Example',
      description: 'This is the example description'
    });
});

export default examples;

// Import only what we need from express
import { Router, Request, Response } from 'express';

const more: Router = Router();

/**
 * GET /
 * More page.
 */
more.get('/', (reg: Request, res: Response) => {
  res.render(
    'more',
    {
      title: 'More',
      description: 'This is the more description'
    });
});

export default more;

// Import only what we need from express
import { Router, Request, Response } from 'express';

const flexbox: Router = Router();

/**
 * GET /
 * Flexbox page.
 */
flexbox.get('/flexbox', (reg: Request, res: Response) => {
  res.render(
    'flexbox',
    {
      title: 'Flexbox',
      description: 'This is the flexbox description'
    });
});

export default flexbox;

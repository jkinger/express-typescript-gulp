// Import only what we need from express
import { Router, Request, Response } from 'express';

const about: Router = Router();

/**
 * GET /
 * About Us page.
 */
about.get('/', (reg: Request, res: Response) => {
  res.render(
    'about',
    {
      title: 'About Us',
      description: 'This is about us description'
    });
});

export default about;

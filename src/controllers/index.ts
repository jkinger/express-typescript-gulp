// Import only what we need from express
import { Router, Request, Response } from 'express';
import i18next from 'i18next';

const index: Router = Router();

/**
 * GET /
 * Home page.
 */
index.get('/', ( req: Request, res: Response) => {
  res.render(
    'index',
    {
      title: 'Home',
      description: 'This is the home description',
      myKey: req.t('myKey')
    });
});

export default index;

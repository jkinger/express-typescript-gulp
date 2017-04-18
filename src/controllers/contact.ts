// Import only what we need from express
import { Router, Request, Response } from 'express';

const contact: Router = Router();

/**
 * GET /
 * Contact Us page.
 */
contact.get('/', (reg: Request, res: Response) => {
  res.render(
    'contact',
    {
      title: 'Contact Us',
      description: 'This is the contact us description'
    });
});

export default contact;

// Import only what we need from express
import { Router, Request, Response } from 'express';

const cards: Router = Router();

/**
 * GET /
 * Cards page.
 */
cards.get('/', (reg: Request, res: Response) => {
  res.render(
    'cards',
    {
      title: 'Cards',
      description: 'This is cards description'
    });
});

export default cards;

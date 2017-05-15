// Import only what we need from express
import { Router, Request, Response } from 'express';

const tiers: Router = Router();

/**
 * GET /
 * Tiers page.
 */
tiers.get('/tiers', (reg: Request, res: Response) => {
  res.render(
    'tiers',
    {
      title: 'Tiers',
      description: 'This is the tiers description'
    });
});

export default tiers;

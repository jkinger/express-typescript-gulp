// Import only what we need from express
import { Router, Request, Response } from 'express';

const portfolio: Router = Router();

/**
 * GET /
 * Portfolio page.
 */
portfolio.get('/', (reg: Request, res: Response) => {
  res.render(
    'portfolio',
    {
      title: 'Portfolio',
      description: 'This is the portfolio description'
    });
});

export default portfolio;

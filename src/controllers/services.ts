// Import only what we need from express
import { Router, Request, Response } from 'express';

const services: Router = Router();

/**
 * GET /
 * Services page.
 */
services.get('/', (reg: Request, res: Response) => {
  res.render(
    'services',
    {
      title: 'Services',
      description: 'This is the services description'
    });
});

export default services;

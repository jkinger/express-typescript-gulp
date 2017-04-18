// Import only what we need from express
import { Router, Request, Response } from 'express';

const blog: Router = Router();

/**
 * GET /
 * Blog page.
 */
blog.get('/', (reg: Request, res: Response) => {
  res.render(
    'blog',
    {
      title: 'Blog',
      description: 'This is the blog description'
    });
});

export default blog;

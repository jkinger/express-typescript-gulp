// Import only what we need from express
import { Router, Request, Response } from 'express';
import * as _ from 'lodash';
import PhotoService from '../services/photos';
import Photo from '../models/photo';

const photoService = new PhotoService();

const cards: Router = Router();

/**
 * GET /
 * Cards page.
 */
cards.get('/cards', (reg: Request, res: Response) => {

  photoService.getAsync().then((photos: Photo[]) => {
    res.render(
      'cards',
      {
        title: 'Cards',
        description: 'This is cards description',
        photos: _.take(photos, 3)
      });
  });
});

/**
 * API GET /
 * Cards data.
 */
cards.get('/api/cards', (reg: Request, res: Response) => {

  photoService.getAsync().then((photos: Photo[]) => {
    res.json(_.take(photos, 12));
  });
});

export default cards;

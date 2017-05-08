// Import only what we need from express
import { Router, Request, Response } from 'express';
import * as _ from 'lodash';
import PhotoService from '../services/photos';
import Photo from '../models/photo';

const photoService = new PhotoService();

const cardViews: Router = Router();
const cardApi: Router = Router();

/**
 * GET /
 * Cards page.
 */
cardViews.get('/', (reg: Request, res: Response) => {

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
cardApi.get('/', (reg: Request, res: Response) => {

  photoService.getAsync().then((photos: Photo[]) => {
    res.json(_.take(photos, 12));
  });
});

export {cardViews, cardApi};

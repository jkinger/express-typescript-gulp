// Import only what we need from express
import { Router } from 'express';

// Controllers
import index from './controllers/index';
import cards from './controllers/cards';
import flexbox from './controllers/flexbox';
import examples from './controllers/examples';
import tiers from './controllers/tiers';
import more from './controllers/more';

const router: Router = Router();

// Add page routes
router.use(index);
router.use(cards);
router.use(flexbox);
router.use(examples);
router.use(tiers);
router.use(more);


export default router;

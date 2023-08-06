import express from 'express';

import { getRestaurants, postRestaurant } from '../controllers/restaurant.controller';

const router = express.Router();

router.get('/', getRestaurants);
router.post('/', postRestaurant);

export default router;
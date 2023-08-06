import express from 'express';
import RestaurantRouter from './restaurant.routes';
import CityRouter from './city.routes';

const router = express.Router();

router.use('/restaurants', RestaurantRouter);
router.use('/cities', CityRouter);

export default router;
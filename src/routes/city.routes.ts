import express from 'express';

import { getCities } from '../controllers/city.controller';

const router = express.Router();

router.get('/', getCities);

export default router;
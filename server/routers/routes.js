import express from 'express';

import {
    getRoutes,
} from '../controllers/routes.js';

import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/', getRoutes);

export default router
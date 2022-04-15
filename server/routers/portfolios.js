import express from 'express';

import { getPortfolio, getPortfolios, createPortfolio } from '../controllers/portfolios.js';

import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/', getPortfolios);

router.get('/:id', getPortfolio);

router.post('/', auth, createPortfolio);

export default router
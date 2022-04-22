import express from 'express';

import {
    getPortfolio, getPortfolios,
    createPortfolio, updatePortfolio, deletePortfolio
} from '../controllers/portfolios.js';

import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/', getPortfolios);

router.get('/:id', getPortfolio);

router.post('/', auth, createPortfolio);

router.patch('/:id', auth, updatePortfolio);

router.delete('/:id', auth, deletePortfolio)

export default router
import express from 'express';

import { getProductsBySearch, getProducts, getProduct, createProduct, updateProduct, deleteProduct, likeProduct } from '../controllers/products.js';

import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/search', getProductsBySearch);
router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', auth, createProduct);

router.patch('/:id', auth, updateProduct)

router.delete('/:id', auth, deleteProduct)

router.patch('/:id/likeProduct', auth, likeProduct)

export default router
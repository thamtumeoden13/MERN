import express from 'express';

import { getProducts, createProduct, updateProduct, deleteProduct, likeProduct } from '../controllers/products.js';

const router = express.Router()

router.get('/', getProducts);

router.post('/', createProduct);

router.patch('/:id', updateProduct)

router.delete('/:id', deleteProduct)

router.patch('/:id/likeProduct', likeProduct)

export default router
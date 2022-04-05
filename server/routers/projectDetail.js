import express from 'express';

import {
    getProjectDetailDetailBySearch, getProjectDetailDetail, getProjectDetail,
    createProjectDetail, updateProjectDetail, deleteProjectDetail,
} from '../controllers/projectDetail.js';

import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/search', getProjectDetailDetailBySearch);
router.get('/', getProjectDetailDetail);
router.get('/:id', getProjectDetail);

router.post('/', auth, createProjectDetail);

router.patch('/:id', auth, updateProjectDetail)

router.delete('/:id', auth, deleteProjectDetail)

export default router
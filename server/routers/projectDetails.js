import express from 'express';

import {
    getProjectDetail,
    getProjectDetails,
    getProjectDetailByPortfolios,
    getProjectDetailByProjects,
    createProjectDetail,
    updateProjectDetail,
    deleteProjectDetail,
} from '../controllers/projectDetail.js';

import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/', getProjectDetails);
router.get('/:id', getProjectDetail);
router.get('/:id/portfolio', getProjectDetailByPortfolios);
router.get('/:id/project', getProjectDetailByProjects);

router.post('/', auth, createProjectDetail);

router.patch('/:id', auth, updateProjectDetail)

router.delete('/:id', auth, deleteProjectDetail)

export default router
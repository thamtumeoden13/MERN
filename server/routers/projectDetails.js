import express from 'express';

import {
    getProjectDetail,
    getProjectDetails,
    getProjectDetailForShowHeaders,
    getProjectDetailsByPortfolioID,
    getProjectDetailsByProjectID,
    getProjectDetailsBySearch,
    createProjectDetail,
    updateProjectDetail,
    deleteProjectDetail,
} from '../controllers/projectDetails.js';

import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/search', getProjectDetailsBySearch);
router.get('/', getProjectDetails);
router.get('/showHeader', getProjectDetailForShowHeaders);
router.get('/:id', getProjectDetail);

router.get('/portfolio/:id', getProjectDetailsByPortfolioID);
router.get('/project/:id', getProjectDetailsByProjectID);

router.post('/', auth, createProjectDetail);

router.patch('/:id', auth, updateProjectDetail)

router.delete('/:id', auth, deleteProjectDetail)

export default router
import express from 'express';

import {
    getProjectDetail,
    getProjectDetails,
    getProjectDetailsByPortfolioID,
    getProjectDetailsByProjectID,
    getProjectDetailsBySearchPortfolioName,
    createProjectDetail,
    updateProjectDetail,
    deleteProjectDetail,
} from '../controllers/projectDetail.js';

import auth from '../middleware/auth.js';

const router = express.Router()

router.get('/search', getProjectDetailsBySearchPortfolioName);
router.get('/', getProjectDetails);
router.get('/:id', getProjectDetail);

router.get('/portfolio/:id', getProjectDetailsByPortfolioID);
router.get('/project/:id', getProjectDetailsByProjectID);

router.post('/', auth, createProjectDetail);

router.patch('/:id', auth, updateProjectDetail)

router.delete('/:id', auth, deleteProjectDetail)

export default router
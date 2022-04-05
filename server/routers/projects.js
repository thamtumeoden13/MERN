import express from 'express';

import {
    // getProjectsBySearch,
    getProjects,
    // getProject,
    createProject,
    //  updateProject, 
    //  deleteProject,
} from '../controllers/projects.js';

import auth from '../middleware/auth.js';

const router = express.Router()

// router.get('/search', getProjectsBySearch);

router.get('/', getProjects);

// router.get('/:id', getProject);

router.post('/', auth, createProject);

// router.patch('/:id', auth, updateProject)

// router.delete('/:id', auth, deleteProject)

export default router
import express from "express";

import * as CONTROLLER from '../controllers/cloudinarys.js';

import * as CONFIG from '../configs/cloudinary.config.js'

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', CONTROLLER.getAllFiles);

router.post('/uploadFile', auth, CONFIG.uploadCloudFile.single('file'), CONTROLLER.uploadFile);
router.post('/uploadPorfolio', auth, CONFIG.uploadCloudPorfolio.single('file'), CONTROLLER.uploadFile);
router.post('/uploadProject', auth, CONFIG.uploadCloudProject.single('file'), CONTROLLER.uploadFile);
router.post('/uploadProjectDetail', auth, CONFIG.uploadCloudProjectDetail.single('file'), CONTROLLER.uploadFile);

router.post('/uploadFiles', auth, CONFIG.uploadCloudFile.array('files'), CONTROLLER.uploadFiles);
router.post('/uploadPorfolios', auth, CONFIG.uploadCloudPorfolio.array('files'), CONTROLLER.uploadFiles);
router.post('/uploadProjects', auth, CONFIG.uploadCloudProject.array('files'), CONTROLLER.uploadFiles);
router.post('/uploadProjectDetails', auth, CONFIG.uploadCloudProjectDetail.array('files'), CONTROLLER.uploadFiles);

export default router
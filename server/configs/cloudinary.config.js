// const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storageFile = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    // params: {
    //     folder: "PORTFOLIO",
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});
const uploadCloudFile = multer({ storage: storageFile });

const storagePorfolio = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: "PORTFOLIO",
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});
const uploadCloudPorfolio = multer({ storage: storagePorfolio });

const storageProject = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: "PROJECT",
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});
const uploadCloudProject = multer({ storage: storageProject });

const storageProjectDetail = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: "PROJECTDETAIL",
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now());
    }
});
const uploadCloudProjectDetail = multer({ storage: storageProjectDetail });

export { uploadCloudFile, uploadCloudPorfolio, uploadCloudProject, uploadCloudProjectDetail }

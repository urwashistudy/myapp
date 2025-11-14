const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/upload.controller')
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } })

router.post('/upload', upload.single('file1'), uploadController.uploadFile)

module.exports = router
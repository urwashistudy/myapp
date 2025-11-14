const multer = require('multer');
const upload = multer({ dest: './uploads/' })

exports.uploadFile = async (req, res) => {
    console.log(`Inside uploadController`)
    try {
        console.log(`Inside try`)
        res.json({ message: 'File uploaded successfully', file: req.file })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error uploading file.' })
    }
}
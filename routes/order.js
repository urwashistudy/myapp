const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
    res.send('Pointing to orders router')
})

module.exports = router
const express = require("express");


const concertRoutes = require('./concertRoutes')

const router = express.Router();

router.use('/concert', concertRoutes)

module.exports = router;
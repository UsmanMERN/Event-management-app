const express = require("express");
const { getConcertCtrl } = require("../controllers/concertController");


const router = express.Router()

router.get("/concert", getConcertCtrl)


module.exports = router
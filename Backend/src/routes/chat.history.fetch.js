const express = require("express");
const { jwtVerify } = require("../middleware/jwtVerify");
const { getChatHistory } = require("../Controllers/chat.history");
const router = express.Router();

router.get("/", jwtVerify, getChatHistory);

module.exports = router;
const express = require("express");
const { promptController } = require("../Controllers/mistral.api.controller");
const { jwtVerify } = require("../middleware/jwtVerify");
const router = express.Router();

router.post("/", jwtVerify, promptController);

module.exports = router;
const express = require("express");

const router = express.Router();
const api = require("../controllers/waControler");

router.get("/api", api);

module.exports = router;

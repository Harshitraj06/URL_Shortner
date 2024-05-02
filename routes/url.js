const express = require("express")
const router = express.Router();
const {handleGenerateNewShortURL, handleGetAnalytics} = require("../controllers/url");

router.get("/analytics/:shortId", handleGetAnalytics)

router.post("/", handleGenerateNewShortURL)
module.exports = router;


const express = require("express"),
router = express.Router(),
Blog = require("../models/blog");


router.get("/", (req,res) => res.send("first route works"));


module.exports = router;

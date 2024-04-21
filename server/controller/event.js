const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/event/createAbl");
const DeleteAbl = require("../abl/event/deleteAbl");


router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
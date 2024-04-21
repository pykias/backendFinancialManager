const express = require("express");
const router = express.Router();


const CreateAbl = require("../abl/user/createAbl");
const DeleteAbl = require("../abl/user/deleteAbl");

router.post("/create", CreateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
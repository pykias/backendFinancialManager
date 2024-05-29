const express = require("express");
const router = express.Router();
const createAbl = require("../abl/user/createAbl");
const listAbl = require("../abl/user/listAbl");
const deleteAbl = require("../abl/user/deleteAbl");
const getAbl = require("../abl/user/getAbl");
const updateAbl = require("../abl/user/updateAbl");

router.post("/create", createAbl);
router.get("/list", listAbl);
router.post("/delete", deleteAbl);
router.get("/get", getAbl);
router.post("/update", updateAbl);

module.exports = router;

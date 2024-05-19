const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/transaction/getTransactionAbl");
const ListAbl = require("../abl/transaction/listTransactionAbl");
const CreateAbl = require("../abl/transaction/createTransactionAbl");
const UpdateAbl = require("../abl/transaction/updateTransactionAbl");
const DeleteAbl = require("../abl/transaction/deleteTransactionAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;

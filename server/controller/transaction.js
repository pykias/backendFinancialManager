const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/transaction/getTransactionAbl");
const ListAbl = require("../abl/transaction/listTransactionAbl");
const CreateAbl = require("../abl/transaction/createTransactionAbl");
const UpdateAbl = require("../abl/transaction/updateTransactionAbl");
const DeleteAbl = require("../abl/transaction/deleteTransactionAbl");
const loadFinancialOverviewAbl = require("../abl/financialOverview/loadFinancialOverviewAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);
router.get("/financialOverview", loadFinancialOverviewAbl);

module.exports = router;

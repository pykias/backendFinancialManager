const express = require('express');
const router = express.Router();
const getAttendanceAbl = require('../abl/attendance/getAttendanceAbl');

router.post('/get', getAttendanceAbl);

module.exports = router;

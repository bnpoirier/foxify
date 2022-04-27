const { getBoolean } = require('../utils/misc');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // "force_download" parameter change xpi mimetype to "octet-stream"
  // if "force_download" query parameter is defined, set variable to 1
  let force_dl = (getBoolean(req.query.force_dl) ? 1 : 0);

  res.render('index', {force_dl: force_dl});
});

module.exports = router;

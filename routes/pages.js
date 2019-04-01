const express = require('express');
const config = require('../config');
const Tokens = require('csrf');
const { isTrue } = require('../libraries/bootstrap');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // "force_download" parameter change xpi mimetype to "octet-stream"
  // if "force_download" query parameter is defined, set variable to 1
  let force_dl = (isTrue(req.query.force_dl) ? 1 : 0);

  res.render('index', {force_dl: force_dl});
});

module.exports = router;

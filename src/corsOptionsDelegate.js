require('dotenv').config
const { CORS_WHITELIST } = require("./config");

const whitelist = CORS_WHITELIST;
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1 || req.header('Authorization').split(" ")[1] === process.env.API_TOKEN) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

module.exports = corsOptionsDelegate;

const { NODE_ENV } = require('./config') 

const error404 = function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  }

const errorHandler = function(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
}

module.exports = {errorHandler, error404};

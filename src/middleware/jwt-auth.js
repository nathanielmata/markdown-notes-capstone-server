const AuthService = require('../endpoints/auth/auth-service')

function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''

  let bearerToken
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' })
  } else {
    bearerToken = authToken.slice('bearer '.length, authToken.length)
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken)

    AuthService.getUserWithUserName(
      req.app.get('db'),
      payload.sub, // subject sent in jwt from authRouter is the user_name that we verified and we use to query db
    )
      .then(user => {
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' })

      // creates a user item on the req object and sets it equal to the user that 
      // was retrieved from the db using the payload sub(which we set as username when creating the jwt)
      req.user = user
      next()
    })
    .catch(err => {
      console.error(err)
      next(err)
    })
  } catch(error) {
    res.status(401).json({ error: 'Unauthorized request' })
  }
    
}

module.exports = {
  requireAuth,
}

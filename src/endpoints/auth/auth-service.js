const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const xss = require("xss");
const config = require("../../config");

const AuthService = {
  getUserWithUserName(db, user_name) {
    return db('markdown_users')
      .where({ user_name })
      .first()
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash)
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    })
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    })
  },
  serializeUser(user) {
    return {
      user_name: xss(user.user_name),
      full_name: xss(user.full_name),
    };
  }
}

module.exports = AuthService

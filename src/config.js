module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://markdown@localhost/markdown',
  TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://markdown@localhost/markdown-test',
  CORS_WHITELIST: ['http://localhost:3000']
}
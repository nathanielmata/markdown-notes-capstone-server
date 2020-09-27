module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://markdown@localhost/markdown',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://markdown@localhost/markdown-test',
  JWT_SECRET: process.env.JWT_SECRET || 'use-env-secret',
  CORS_WHITELIST: ['https://markdown-notes-capstone-client.vercel.app', 'http://localhost:3000/']
}
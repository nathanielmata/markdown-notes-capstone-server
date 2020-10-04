const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Protected endpoints', function() {
  let db

  const {
    testUsers,
    testNotes,
  } = helpers.makeNotesFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  beforeEach('insert notes', () =>
    helpers.seedNotesTables(
      db,
      testUsers,
      testNotes,
    )
  )

  const protectedEndpoints = [
    {
      name: 'GET /api/notes',
      path: '/api/notes',
      method: supertest(app).get,
    },
    {
      name: 'GET /api/notes/:id',
      path: '/api/notes/1',
      method: supertest(app).get,
    },
    {
      name: 'GET /api/notes',
      path: '/api/notes',
      method: supertest(app).post,
    },
  ]

  protectedEndpoints.forEach(endpoint => {
    beforeEach('cleanup', () => helpers.cleanTables(db))

    describe(endpoint.name, () => {
      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint.method(endpoint.path)
          .expect(401, { error: `Missing bearer token` })
      })

      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testUsers[0]
        const invalidSecret = 'bad-secret'
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
          .expect(401, { error: `Unauthorized request` })
      })

      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { user_name: 'user-does-not-exist', id: 1 }
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` })
      })

    })
  })
})

const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe(`Notes Endpoints`, function() {
  let db;

  const {
    testUsers,
    testNotes,
  } = helpers.makeNotesFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/notes`, () => {
    
    context(`Given no notes`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )
      
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/notes')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, [])
      })
    })

    context('Given there are notes in the database', () => {
      beforeEach('insert notes', () =>
        helpers.seedNotesTables(
          db,
          testUsers,
          testNotes,
        )
      )

      it('responds with 200 and all of the notes', () => {
        const expectedNotes = helpers.makeExpectedNotes(testUsers[0], testNotes);

        return supertest(app)
          .get('/api/notes')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedNotes)
      })
    })

    context(`Given an XSS attack note title`, () => {
      const testUser = testUsers[0];
      const {
        maliciousNote,
        expectedNote,
      } = helpers.makeMaliciousNote(testUser)

      beforeEach('insert malicious note', () => {
        return helpers.seedMaliciousNote(
          db,
          testUser,
          maliciousNote,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get('/api/notes')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedNote.title)
          })
      })
    })
  })

  describe(`GET /api/notes/:id`, () => {

    context(`Given note does not exist`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )
      
      it(`responds with 404`, () => {
        const id = 100000
        return supertest(app)
          .get(`/api/notes/${id}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Note doesn't exist` })
      })
    })

    context(`Given an XSS attack note title`, () => {
      const testUser = testUsers[0];
      const {
        maliciousNote,
        expectedNote,
      } = helpers.makeMaliciousNote(testUser)

      beforeEach('insert malicious note', () => {
        return helpers.seedMaliciousNote(
          db,
          testUser,
          maliciousNote,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/notes/${maliciousNote.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedNote.title)
            expect(res.body.content).to.eql(expectedNote.content)
          })
      })
    })

  })
})
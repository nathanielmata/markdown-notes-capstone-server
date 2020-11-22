const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const xss = require("xss");

function makeUsersArray() {
  return [
    {
      id: 1,
      email: 'nate@example.com',
      user_name: 'testuser1',
      full_name: 'Test User 1',
      password: 'password',
      created_at: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      email: 'nathan@example.com',
      user_name: 'testuser2',
      full_name: 'Test User 2',
      password: 'password',
      created_at: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      email: 'jose@example.com',
      user_name: 'testuser3',
      full_name: 'Test User 3',
      password: 'password',
      created_at: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeNotesArray(users) {
  return [
    {
      id: 1,
      user_id: users[0].id,
      uid: '6d3c16f16ff3400da7d2998c7bc518c0',
      title: 'SVGs in JSX',
      content: '# SVGs in JSX \n - > [SVGtoJSX Electron App](https://github.com/SaraVieira/svg-to-jsx-electron/) \n ```- [SVG Basic Shapes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes)```',
      published: false,
      created_at: '2029-01-22T16:28:32.615Z',
      updated_at: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_id: users[1].id,
      uid: 'cbd1c89ade844879ad9e961cd9a33a16',
      title: 'Markdown Cheatsheet',
      content: '# Markdown Cheatsheet \n - [Github Markdown Syntax](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)',
      published: false,
      created_at: '2020-01-21T16:28:32.615Z',
      updated_at: '2020-01-21T16:28:32.615Z',
    },
    {
      id: 3,
      user_id: users[2].id,
      uid: '936e7d5359764c8ba0959e3eddade160',
      title: 'CSS Animations',
      content: '# CSS Animations \n\n- Use @keyframes to control the intermediate steps in a CSS animation sequence \n\n- [MDN @keyframes ref](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)',
      published: false,
      created_at: '2020-01-22T16:28:32.615Z',
      updated_at: '2020-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_id: users[0].id,
      uid: '4da4195d0bee4bb8af80a5ab78b19691',
      title: 'Unordered Lists',
      content: '* something \n* another thing \n* last thing \n* one more \n*not in the list\n***not in the list *hello* hi***',
      published: false,
      created_at: '2020-01-23T16:28:32.615Z',
      updated_at: '2020-01-23T16:28:32.615Z',      
    },
  ]
}

function makeExpectedNotes(user, notes) {
  const expectedNotes = [];
  notes.forEach(note => {
    if (note.user_id === user.id) {
      expectedNotes.push(
        {
          id: note.id,
          title: xss(note.title),
          published: note.published,
          created_at: note.created_at,
          updated_at: note.updated_at,
        }
      )
    }
  });

  return expectedNotes;
}

function makeExpectedNote(note) {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    published: note.published,
    created_at: note.created_at,
    updated_at: note.updated_at,
  };
}

function makeMaliciousNote(user) {
  const maliciousNote = {
    id: 1,
    user_id: user.id,
    uid: '6d3c16f16ff3400da7d2998c7bc518c0',
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    content: `# SVGs in JSX \n - <img src="https://example.com/nothing.txt" onerror="alert(document.cookie);">.`,
    published: false,
    created_at: '2029-01-22T16:28:32.615Z',
    updated_at: '2029-01-22T16:28:32.615Z',
  }
  const expectedNote = {
    ...makeExpectedNote([user], maliciousNote),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `# SVGs in JSX \n - <img src="https://example.com/nothing.txt">.`,
  }
  return {
    maliciousNote,
    expectedNote,
  }
}

function makeNotesFixtures() {
  const testUsers = makeUsersArray()
  const testNotes = makeNotesArray(testUsers)
  return { testUsers, testNotes }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        markdown_notes,
        markdown_users
        RESTART IDENTITY CASCADE
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE markdown_notes_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE markdown_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('markdown_notes_id_seq', 0)`),
        trx.raw(`SELECT setval('markdown_users_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('markdown_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('markdown_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedNotesTables(db, users, notes) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('markdown_notes').insert(notes)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('markdown_notes_id_seq', ?)`,
      [notes[notes.length - 1].id],
    )
  })
}

function seedMaliciousNote(db, user, note) {  
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('markdown_notes')
        .insert([note])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id, full_name: user.full_name }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeNotesArray,

  makeMaliciousNote,
  makeExpectedNotes,
  makeNotesFixtures,
  cleanTables,
  seedNotesTables,
  seedMaliciousNote,

  makeAuthHeader,
  seedUsers,
}
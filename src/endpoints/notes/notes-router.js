const express = require("express");
const NotesService = require("./notes-service");
// const { requireAuth } = require('../middleware/jwt-auth')

const notesRouter = express.Router();
// const jsonBodyParser = express.json();

notesRouter
  .route("/")
  .get((req, res, next) => {
    NotesService.getAllNotes(req.app.get("db"))
      .then((notes) => {
        res.json(NotesService.serializeNotes(notes));
      })
      .catch(next);
  });

notesRouter
  .route('/:id')
  // .all(requireAuth)
  .all(checkNoteExists)
  .get((req, res) => {
    res.json(NotesService.serializeNote(res.note))
  })

/* async/await syntax for promises */
async function checkNoteExists(req, res, next) {
  try {
    const note = await NotesService.getById(
      req.app.get('db'),
      req.params.id
    )

    if (!note)
      return res.status(404).json({
        error: `Note doesn't exist`
      })

    res.note = note
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = notesRouter;

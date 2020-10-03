const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const NotesService = require("./notes-service");
const { requireAuth } = require("../../middleware/jwt-auth");

const notesRouter = express.Router();
const jsonBodyParser = express.json();

notesRouter
  .route("/")
  .all(requireAuth)
  .get((req, res, next) => {
    NotesService.getAllNotes(req.app.get("db"), req.user.id)
      .then((notes) => {
        res.json(NotesService.serializeNotes(notes));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { title, content } = req.body
    const newNote = { title, content }

    for (const [key, value] of Object.entries(newNote)) {
      if (value == null || value === "") {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
      }
    }

    newNote.user_id = req.user.id
    newNote.uid = uuidv4().replace(/-/gi, "");

    NotesService.insertNote(
      req.app.get('db'),
      newNote
    )
    .then(note => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${note.id}`))
        .json(NotesService.serializeNote(note))
    })
    .catch(next)
  });

notesRouter
  .route('/:id')
  .all(requireAuth)
  .all(checkNoteExists)
  .get((req, res) => {
    res.json(NotesService.serializeNote(res.note))
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { title, content } = req.body;
    const noteToUpdate = { title, content };

    for (const [key, value] of Object.entries(noteToUpdate)) {
      if (value == null || value === "") {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
      }
    }

    noteToUpdate.updated_at = new Date().toISOString();

    NotesService.updateNote(
      req.app.get("db"),
      req.params.id,
      noteToUpdate
    )
    .then(note => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${note.id}`))
        .json(NotesService.serializeNote(note))
    })
    .catch(next)
  });

/* async/await syntax for promises */
async function checkNoteExists(req, res, next) {
  try {
    const note = await NotesService.getById(
      req.app.get('db'),
      req.params.id,
      req.user.id
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

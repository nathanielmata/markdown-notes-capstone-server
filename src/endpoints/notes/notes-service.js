const xss = require("xss");

const NotesService = {
  getAllNotes(db) {
    return db.select("*").from("markdown_notes");
  },

  getById(db, id) {
    return NotesService.getAllNotes(db).where("id", id).first();
  },

  insertNote(db, newNote) {
    return db
      .insert(newNote)
      .into("markdown_notes")
      .returning("*")
      .then(([note]) => note)
      .then((note) => NotesService.getById(db, note.id));
  },

  serializeNotes(notes) {
    return notes.map((note) => {
      return {
        id: note.id,
        title: xss(note.title),
        published: note.published,
        created_at: note.created_at,
        updated_at: note.updated_at,
      };
    });
  },

  serializeNote(note) {
    return {
      id: note.id,
      title: xss(note.title),
      content: xss(note.content),
      published: note.published,
      created_at: note.created_at,
      updated_at: note.updated_at,
    };
  },
};

module.exports = NotesService;

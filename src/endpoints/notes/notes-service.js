const xss = require('xss');

const NotesService = {
  getAllNotes(db, user_id) {
    return db
      .select('*')
      .from('markdown_notes')
      .where({user_id})
      .orderBy('id');
  },

  getById(db, id, user_id) {
    return NotesService
    .getAllNotes(db, user_id)
    .where({id})
    .first();
  },

  insertNote(db, newNote) {
    return db
      .insert(newNote)
      .into('markdown_notes')
      .returning('*')
      .then(([note]) => note)
      .then((note) => NotesService.getById(db, note.id, note.user_id));
  },

  updateNote(db, id, newNoteFields) {
    return db('markdown_notes')
      .where({id})
      .update(newNoteFields)
      .returning('*')
      .then(([note]) => note)
      .then((note) => NotesService.getById(db, note.id, note.user_id));
  },

  deleteNote(db, id, user_id) {
		return db('markdown_notes')
			.where('id', id)
			.where('user_id', user_id)
			.delete();
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
      content: note.content,
      published: note.published,
      created_at: note.created_at,
      updated_at: note.updated_at,
    };
  },
};

module.exports = NotesService;

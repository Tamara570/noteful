import React from 'react';
//mport { Link } from 'react-router-dom';
import NoteContext from '../NoteContext'
import { getNotesForFolder } from '../note-helpers'
import Note from '../Note/Note';


class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NoteContext

  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
   
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.title}
                modified={note.date_noted}
              />
            </li>
          )}
        </ul>
        <button>New Note</button>
      </section>
    );
  }
}

NoteListMain.defaultProps = {
  notes: []
}

export default NoteListMain;
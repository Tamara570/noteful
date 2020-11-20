import React from 'react';
import NoteContext from '../NoteContext'
import { findNote } from '../note-helpers'
import Note from '../Note/Note';

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NoteContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {

    const { notes=[] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    
    return (
      <div className="Main">
        <Note
          id={note.id}
          name={note.title}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </div>
    );
  }

}

export default NotePageMain;
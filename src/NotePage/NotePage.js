import React from 'react';
import NoteContext from '../NoteContext'
import { findNote } from '../note-helpers'
import Note from '../Note/Note';
import PropTypes from 'prop-types'

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      goBack: () => {}
    },	   
  }
  static contextType = NoteContext

  static propTypes = {
    match: {
      params:
        { noteId: PropTypes.string }
    },
    history: PropTypes.any
  }

  handleDeleteNote = (noteId) => {
    this.props.history.push(`/`)
  }

  render() {

    const { notes = [] } = this.context
    console.log(notes)
    const { noteId } = this.props.match.params
    console.log(this.props.match.params)
    const note = findNote(notes, noteId) || { content: '' }
    console.log(note)
    
    return (
      <div className="Main">
        <Note
          id={noteId}
          name={note.note_name}
          modified={note.date_created}
          onDeleteNote={this.handleDeleteNote(noteId)}
        />
        <div className='NotePage_content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </div>
    );
  }

}

export default NotePageMain;
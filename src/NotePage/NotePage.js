import React from 'react';
import NoteContext from '../NoteContext'
import { findNote } from '../note-helpers'
import Note from '../Note/Note';
import PropTypes from 'prop-types'
import "./NotePage.css"


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

  // static propTypes = {
  //   match: {
  //     params:
  //       { noteId: PropTypes.string }
  //   },
  //     history: PropTypes.any
  // }

  static propTypes = {
    history: PropTypes.any.isRequired,
    match: PropTypes.any.isRequired
  }

  handleDeleteNote = () => {
    this.props.history.push(`/`)
  }

  render() {

    const { notes = [] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    console.log(findNote(notes, noteId))
    
    return (
      <div className="Note_Section">
        <Note
          id={note.id}
          name={note.note_name}
          modified={note.date_created}
          onClick={() => this.handleDeleteNote}
          />
        <div className='NotePage_content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>Note Content: {para}</p>
          )}
        </div>
      </div>
    );
  }

}

export default NotePageMain;
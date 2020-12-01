import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../note-helpers'
import Note from '../Note/Note';
import PropTypes from 'prop-types'
// import config from '../config'
import './NoteList.css'


class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  // static propTypes = {
  //   match: {
  //     params:
  //       { folder_id : PropTypes.string }
  //   } 
  // }
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape(
        { folderId: PropTypes.string })
    }),
  }

  static contextType = NoteContext;




  render() {
    const folderId = this.props.match.params.folder_id  
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)

        return (
        <section className='NoteListMain'>
          <ul>
            {console.log('NOTES1 ', notesForFolder)}
            {notesForFolder.map(note =>
              <div key={note.id}>
                <Note
                  id={note.id}
                  name={note.note_name}
                  modified={note.date_created}
                  handleClickDelete={this.handleClickDelete}
                />
              </div>
            )}
          </ul>
          <Link
            tag={Link}
            to='/add-note'
            type='button'
            className="Links"
          >
            New Note
          </Link>
        </section>
    );
  }
}

// NoteListMain.defaultProps = {
//   notes: []
// }

export default NoteListMain;